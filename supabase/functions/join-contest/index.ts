import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface JoinContestRequest {
  contestId: string;
  teamId: string;
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

    const { contestId, teamId }: JoinContestRequest = await req.json();

    console.log(`User ${user.id} attempting to join contest ${contestId} with team ${teamId}`);

    // Get user profile and wallet balance
    const { data: profile, error: profileError } = await supabaseService
      .from('profiles')
      .select('wallet_balance, kyc_verified')
      .eq('user_id', user.id)
      .single();

    if (profileError || !profile) {
      throw new Error('User profile not found');
    }

    if (!profile.kyc_verified) {
      throw new Error('KYC verification required to join contests');
    }

    // Get contest details
    const { data: contest, error: contestError } = await supabaseService
      .from('contests')
      .select('*, games(title)')
      .eq('id', contestId)
      .single();

    if (contestError || !contest) {
      throw new Error('Contest not found');
    }

    if (contest.status !== 'open') {
      throw new Error('Contest is not open for entries');
    }

    if (contest.current_participants >= contest.max_participants) {
      throw new Error('Contest is full');
    }

    // Check if user already joined this contest
    const { data: existingEntry } = await supabaseService
      .from('contest_entries')
      .select('id')
      .eq('user_id', user.id)
      .eq('contest_id', contestId)
      .single();

    if (existingEntry) {
      throw new Error('You have already joined this contest');
    }

    // Verify team belongs to user
    const { data: team, error: teamError } = await supabaseService
      .from('fantasy_teams')
      .select('id, team_name')
      .eq('id', teamId)
      .eq('user_id', user.id)
      .single();

    if (teamError || !team) {
      throw new Error('Team not found or does not belong to user');
    }

    // Check wallet balance
    if (profile.wallet_balance < contest.entry_fee) {
      throw new Error('Insufficient wallet balance');
    }

    // Start transaction - deduct entry fee and join contest
    const newBalance = profile.wallet_balance - contest.entry_fee;

    // Update wallet balance
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
        type: 'contest_entry',
        amount: -contest.entry_fee,
        description: `Entry fee for ${contest.name} in ${contest.games?.title}`,
        status: 'completed',
        metadata: {
          contest_id: contestId,
          team_id: teamId,
          contest_name: contest.name
        }
      });

    if (transactionError) {
      console.error('Transaction error:', transactionError);
      // Rollback wallet balance
      await supabaseService
        .from('profiles')
        .update({ wallet_balance: profile.wallet_balance })
        .eq('user_id', user.id);
      throw new Error('Failed to record transaction');
    }

    // Create contest entry
    const { error: entryError } = await supabaseService
      .from('contest_entries')
      .insert({
        user_id: user.id,
        contest_id: contestId,
        fantasy_team_id: teamId,
        entry_fee_paid: contest.entry_fee
      });

    if (entryError) {
      console.error('Contest entry error:', entryError);
      // Rollback wallet balance
      await supabaseService
        .from('profiles')
        .update({ wallet_balance: profile.wallet_balance })
        .eq('user_id', user.id);
      throw new Error('Failed to join contest');
    }

    // Update contest participant count
    const { error: updateError } = await supabaseService
      .from('contests')
      .update({ 
        current_participants: contest.current_participants + 1,
        prize_pool: contest.prize_pool + contest.entry_fee
      })
      .eq('id', contestId);

    if (updateError) {
      console.error('Contest update error:', updateError);
    }

    console.log(`User ${user.id} successfully joined contest ${contestId}`);

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Successfully joined contest',
        data: {
          newBalance,
          contestName: contest.name,
          teamName: team.team_name,
          entryFee: contest.entry_fee
        }
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );

  } catch (error: any) {
    console.error('Join contest error:', error.message);
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