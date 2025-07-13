import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface DistributePrizesRequest {
  contestId: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Create service client for admin operations
    const supabaseService = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      { auth: { persistSession: false } }
    );

    const { contestId }: DistributePrizesRequest = await req.json();

    console.log(`Starting prize distribution for contest ${contestId}`);

    // Get contest details
    const { data: contest, error: contestError } = await supabaseService
      .from('contests')
      .select('*, games(title)')
      .eq('id', contestId)
      .single();

    if (contestError || !contest) {
      throw new Error('Contest not found');
    }

    if (contest.status !== 'completed') {
      throw new Error('Contest must be completed before distributing prizes');
    }

    // Get all contest entries with fantasy team details, ordered by points
    const { data: entries, error: entriesError } = await supabaseService
      .from('contest_entries')
      .select(`
        *,
        fantasy_teams(total_points, team_name),
        profiles(username)
      `)
      .eq('contest_id', contestId)
      .order('fantasy_teams(total_points)', { ascending: false });

    if (entriesError || !entries || entries.length === 0) {
      throw new Error('No entries found for this contest');
    }

    console.log(`Found ${entries.length} entries for prize distribution`);

    // Define prize structure (can be customized based on contest type)
    const prizeStructure = calculatePrizeStructure(contest.prize_pool, entries.length);
    
    const distributions: any[] = [];
    let totalDistributed = 0;

    // Distribute prizes
    for (let i = 0; i < entries.length && i < prizeStructure.length; i++) {
      const entry = entries[i];
      const prizeAmount = prizeStructure[i];
      const rank = i + 1;

      if (prizeAmount > 0) {
        // Update contest entry with final rank and winnings
        const { error: updateEntryError } = await supabaseService
          .from('contest_entries')
          .update({
            final_rank: rank,
            winnings: prizeAmount,
            points_earned: entry.fantasy_teams?.total_points || 0
          })
          .eq('id', entry.id);

        if (updateEntryError) {
          console.error(`Error updating entry ${entry.id}:`, updateEntryError);
          continue;
        }

        // Update user wallet balance
        const { data: profile, error: profileError } = await supabaseService
          .from('profiles')
          .select('wallet_balance')
          .eq('user_id', entry.user_id)
          .single();

        if (profileError || !profile) {
          console.error(`Profile not found for user ${entry.user_id}`);
          continue;
        }

        const newBalance = Number(profile.wallet_balance) + prizeAmount;

        const { error: balanceError } = await supabaseService
          .from('profiles')
          .update({ wallet_balance: newBalance })
          .eq('user_id', entry.user_id);

        if (balanceError) {
          console.error(`Error updating balance for user ${entry.user_id}:`, balanceError);
          continue;
        }

        // Create transaction record for winnings
        const { error: transactionError } = await supabaseService
          .from('transactions')
          .insert({
            user_id: entry.user_id,
            type: 'winnings',
            amount: prizeAmount,
            description: `Prize money for rank ${rank} in ${contest.name}`,
            status: 'completed',
            metadata: {
              contest_id: contestId,
              contest_name: contest.name,
              rank: rank,
              total_points: entry.fantasy_teams?.total_points || 0,
              team_name: entry.fantasy_teams?.team_name
            }
          });

        if (transactionError) {
          console.error(`Error creating transaction for user ${entry.user_id}:`, transactionError);
        }

        // Update leaderboard
        const { error: leaderboardError } = await supabaseService
          .from('leaderboards')
          .insert({
            user_id: entry.user_id,
            contest_id: contestId,
            total_points: entry.fantasy_teams?.total_points || 0,
            rank: rank,
            winnings: prizeAmount
          });

        if (leaderboardError) {
          console.error(`Error updating leaderboard for user ${entry.user_id}:`, leaderboardError);
        }

        distributions.push({
          userId: entry.user_id,
          username: entry.profiles?.username,
          teamName: entry.fantasy_teams?.team_name,
          rank: rank,
          points: entry.fantasy_teams?.total_points || 0,
          prizeAmount: prizeAmount,
          newBalance: newBalance
        });

        totalDistributed += prizeAmount;
      } else {
        // Update entry with rank but no winnings
        const { error: updateEntryError } = await supabaseService
          .from('contest_entries')
          .update({
            final_rank: rank,
            winnings: 0,
            points_earned: entry.fantasy_teams?.total_points || 0
          })
          .eq('id', entry.id);

        if (updateEntryError) {
          console.error(`Error updating entry ${entry.id}:`, updateEntryError);
        }

        // Update leaderboard
        const { error: leaderboardError } = await supabaseService
          .from('leaderboards')
          .insert({
            user_id: entry.user_id,
            contest_id: contestId,
            total_points: entry.fantasy_teams?.total_points || 0,
            rank: rank,
            winnings: 0
          });

        if (leaderboardError) {
          console.error(`Error updating leaderboard for user ${entry.user_id}:`, leaderboardError);
        }
      }
    }

    console.log(`Prize distribution completed. Total distributed: $${totalDistributed}`);

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Prizes distributed successfully',
        data: {
          contestId,
          contestName: contest.name,
          totalParticipants: entries.length,
          totalPrizePool: contest.prize_pool,
          totalDistributed,
          distributions
        }
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );

  } catch (error: any) {
    console.error('Prize distribution error:', error.message);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});

// Calculate prize structure based on total prize pool and number of participants
function calculatePrizeStructure(totalPrize: number, participants: number): number[] {
  const prizes: number[] = [];
  
  if (participants === 1) {
    prizes.push(totalPrize);
  } else if (participants === 2) {
    prizes.push(totalPrize * 0.7); // 70% to 1st
    prizes.push(totalPrize * 0.3); // 30% to 2nd
  } else if (participants <= 5) {
    prizes.push(totalPrize * 0.5);  // 50% to 1st
    prizes.push(totalPrize * 0.3);  // 30% to 2nd
    prizes.push(totalPrize * 0.2);  // 20% to 3rd
  } else if (participants <= 10) {
    prizes.push(totalPrize * 0.4);  // 40% to 1st
    prizes.push(totalPrize * 0.25); // 25% to 2nd
    prizes.push(totalPrize * 0.15); // 15% to 3rd
    prizes.push(totalPrize * 0.1);  // 10% to 4th
    prizes.push(totalPrize * 0.1);  // 10% to 5th
  } else {
    // For larger contests, distribute to top 20%
    const winnerCount = Math.ceil(participants * 0.2);
    const baseAmount = totalPrize / winnerCount;
    
    for (let i = 0; i < winnerCount; i++) {
      if (i === 0) prizes.push(baseAmount * 2);        // 1st place gets double
      else if (i === 1) prizes.push(baseAmount * 1.5); // 2nd place gets 1.5x
      else prizes.push(baseAmount * 0.8);              // Others get 0.8x
    }
    
    // Normalize to ensure total doesn't exceed prize pool
    const total = prizes.reduce((sum, prize) => sum + prize, 0);
    if (total > totalPrize) {
      const factor = totalPrize / total;
      for (let i = 0; i < prizes.length; i++) {
        prizes[i] = Math.floor(prizes[i] * factor * 100) / 100;
      }
    }
  }
  
  return prizes;
}