import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface WithdrawRequest {
  amount: number;
  withdrawalMethod?: string;
  accountDetails?: {
    bankAccount?: string;
    routingNumber?: string;
    paypalEmail?: string;
  };
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Create Supabase client for user authentication
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    );

    // Create service client for bypassing RLS
    const supabaseService = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      { auth: { persistSession: false } }
    );

    // Get authenticated user
    const authHeader = req.headers.get('Authorization')!;
    const token = authHeader.replace('Bearer ', '');
    const { data } = await supabaseClient.auth.getUser(token);
    const user = data.user;

    if (!user) {
      throw new Error('User not authenticated');
    }

    const { 
      amount, 
      withdrawalMethod = 'bank_transfer', 
      accountDetails 
    }: WithdrawRequest = await req.json();

    // Validate amount
    if (!amount || amount <= 0) {
      throw new Error('Invalid withdrawal amount');
    }

    if (amount < 25) {
      throw new Error('Minimum withdrawal amount is $25');
    }

    console.log(`Processing withdrawal of $${amount} for user ${user.id}`);

    // Get user profile
    const { data: profile, error: profileError } = await supabaseService
      .from('profiles')
      .select('wallet_balance, kyc_verified')
      .eq('user_id', user.id)
      .single();

    if (profileError || !profile) {
      throw new Error('User profile not found');
    }

    // KYC verification required for all withdrawals
    if (!profile.kyc_verified) {
      throw new Error('KYC verification required for withdrawals');
    }

    // Check sufficient balance
    if (Number(profile.wallet_balance) < amount) {
      throw new Error('Insufficient wallet balance');
    }

    // Validate account details based on withdrawal method
    if (withdrawalMethod === 'bank_transfer') {
      if (!accountDetails?.bankAccount || !accountDetails?.routingNumber) {
        throw new Error('Bank account details required for bank transfer');
      }
    } else if (withdrawalMethod === 'paypal') {
      if (!accountDetails?.paypalEmail) {
        throw new Error('PayPal email required for PayPal withdrawal');
      }
    }

    // Calculate withdrawal fee (2% or minimum $2)
    const feePercentage = 0.02;
    const minimumFee = 2;
    const withdrawalFee = Math.max(amount * feePercentage, minimumFee);
    const totalDeduction = amount + withdrawalFee;
    const netAmount = amount;

    if (Number(profile.wallet_balance) < totalDeduction) {
      throw new Error(`Insufficient balance. Total required: $${totalDeduction.toFixed(2)} (Amount: $${amount} + Fee: $${withdrawalFee.toFixed(2)})`);
    }

    // Update wallet balance
    const newBalance = Number(profile.wallet_balance) - totalDeduction;
    
    const { error: balanceError } = await supabaseService
      .from('profiles')
      .update({ wallet_balance: newBalance })
      .eq('user_id', user.id);

    if (balanceError) {
      throw new Error('Failed to update wallet balance');
    }

    // Create withdrawal transaction record
    const { error: withdrawalError } = await supabaseService
      .from('transactions')
      .insert({
        user_id: user.id,
        type: 'withdrawal',
        amount: -amount,
        description: `Withdrawal via ${withdrawalMethod}`,
        status: 'pending',
        metadata: {
          withdrawal_method: withdrawalMethod,
          net_amount: netAmount,
          fee_amount: withdrawalFee,
          account_details: accountDetails
        }
      });

    if (withdrawalError) {
      console.error('Withdrawal transaction error:', withdrawalError);
      // Rollback wallet balance
      await supabaseService
        .from('profiles')
        .update({ wallet_balance: profile.wallet_balance })
        .eq('user_id', user.id);
      throw new Error('Failed to process withdrawal');
    }

    // Create fee transaction record
    const { error: feeError } = await supabaseService
      .from('transactions')
      .insert({
        user_id: user.id,
        type: 'withdrawal',
        amount: -withdrawalFee,
        description: `Withdrawal fee for ${withdrawalMethod}`,
        status: 'completed',
        metadata: {
          transaction_type: 'fee',
          withdrawal_method: withdrawalMethod
        }
      });

    if (feeError) {
      console.error('Fee transaction error:', feeError);
    }

    // Simulate processing withdrawal (in real implementation, integrate with payment processor)
    const processingResult = await simulateWithdrawalProcessing(netAmount, withdrawalMethod);

    console.log(`Withdrawal of $${amount} initiated for user ${user.id}`);

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Withdrawal initiated successfully',
        data: {
          amount: netAmount,
          fee: withdrawalFee,
          total: totalDeduction,
          newBalance,
          estimatedProcessingTime: '1-3 business days',
          transactionId: crypto.randomUUID(),
          status: 'pending'
        }
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );

  } catch (error: any) {
    console.error('Withdrawal error:', error.message);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    );
  }
});

// Simulate withdrawal processing
async function simulateWithdrawalProcessing(amount: number, method: string): Promise<boolean> {
  console.log(`Processing ${method} withdrawal of $${amount}`);
  
  // Simulate processing delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Simulate 98% success rate for withdrawals
  return Math.random() > 0.02;
}