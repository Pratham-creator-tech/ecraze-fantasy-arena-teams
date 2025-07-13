import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface DepositRequest {
  amount: number;
  paymentMethod?: string;
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

    const { amount, paymentMethod = 'card' }: DepositRequest = await req.json();

    // Validate amount
    if (!amount || amount <= 0) {
      throw new Error('Invalid deposit amount');
    }

    if (amount < 10) {
      throw new Error('Minimum deposit amount is $10');
    }

    if (amount > 10000) {
      throw new Error('Maximum deposit amount is $10,000');
    }

    console.log(`Processing deposit of $${amount} for user ${user.id}`);

    // Get user profile
    const { data: profile, error: profileError } = await supabaseService
      .from('profiles')
      .select('wallet_balance, kyc_verified')
      .eq('user_id', user.id)
      .single();

    if (profileError || !profile) {
      throw new Error('User profile not found');
    }

    // For deposits over $500, require KYC verification
    if (amount > 500 && !profile.kyc_verified) {
      throw new Error('KYC verification required for deposits over $500');
    }

    // Simulate payment processing (in real implementation, integrate with Stripe/PayPal)
    const paymentSuccess = await simulatePaymentProcessing(amount, paymentMethod);
    
    if (!paymentSuccess) {
      throw new Error('Payment processing failed');
    }

    // Update wallet balance
    const newBalance = Number(profile.wallet_balance) + amount;
    
    const { error: balanceError } = await supabaseService
      .from('profiles')
      .update({ wallet_balance: newBalance })
      .eq('user_id', user.id);

    if (balanceError) {
      throw new Error('Failed to update wallet balance');
    }

    // Create transaction record
    const { error: transactionError } = await supabaseService
      .from('transactions')
      .insert({
        user_id: user.id,
        type: 'deposit',
        amount: amount,
        description: `Wallet deposit via ${paymentMethod}`,
        status: 'completed',
        metadata: {
          payment_method: paymentMethod,
          deposit_source: 'user_initiated'
        }
      });

    if (transactionError) {
      console.error('Transaction error:', transactionError);
      // Don't rollback as payment was already processed
    }

    console.log(`Successfully processed deposit of $${amount} for user ${user.id}`);

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Deposit successful',
        data: {
          amount,
          newBalance,
          transactionId: crypto.randomUUID(),
          timestamp: new Date().toISOString()
        }
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );

  } catch (error: any) {
    console.error('Deposit error:', error.message);
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

// Simulate payment processing (replace with real payment gateway)
async function simulatePaymentProcessing(amount: number, method: string): Promise<boolean> {
  console.log(`Simulating ${method} payment of $${amount}`);
  
  // Simulate processing delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Simulate 95% success rate
  return Math.random() > 0.05;
}