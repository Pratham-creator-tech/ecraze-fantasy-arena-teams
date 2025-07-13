import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface CreateTeamRequest {
  contestId: string;
  teamName: string;
  selectedPlayers: {
    playerId: string;
    isCaptain?: boolean;
    isViceCaptain?: boolean;
  }[];
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

    const { contestId, teamName, selectedPlayers }: CreateTeamRequest = await req.json();

    console.log(`Creating fantasy team for user ${user.id}, contest ${contestId}`);

    // Validate input
    if (!contestId || !teamName || !selectedPlayers || selectedPlayers.length === 0) {
      throw new Error('Missing required fields');
    }

    if (selectedPlayers.length < 11 || selectedPlayers.length > 11) {
      throw new Error('Team must have exactly 11 players');
    }

    // Validate captain and vice-captain selection
    const captains = selectedPlayers.filter(p => p.isCaptain);
    const viceCaptains = selectedPlayers.filter(p => p.isViceCaptain);

    if (captains.length !== 1) {
      throw new Error('Team must have exactly one captain');
    }

    if (viceCaptains.length !== 1) {
      throw new Error('Team must have exactly one vice-captain');
    }

    if (captains[0].playerId === viceCaptains[0].playerId) {
      throw new Error('Captain and vice-captain must be different players');
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
      throw new Error('Contest is not open for team creation');
    }

    // Check if user already has a team for this contest
    const { data: existingTeam } = await supabaseService
      .from('fantasy_teams')
      .select('id')
      .eq('user_id', user.id)
      .eq('contest_id', contestId)
      .single();

    if (existingTeam) {
      throw new Error('You already have a team for this contest');
    }

    // Get player details and validate
    const playerIds = selectedPlayers.map(p => p.playerId);
    const { data: players, error: playersError } = await supabaseService
      .from('players')
      .select('id, name, position, team, price, status')
      .in('id', playerIds);

    if (playersError || !players || players.length !== playerIds.length) {
      throw new Error('Some selected players not found');
    }

    // Check if all players are active
    const inactivePlayers = players.filter(p => p.status !== 'active');
    if (inactivePlayers.length > 0) {
      throw new Error(`Some players are not available: ${inactivePlayers.map(p => p.name).join(', ')}`);
    }

    // Validate team composition (basic rules)
    const positions = players.reduce((acc: Record<string, number>, player) => {
      acc[player.position] = (acc[player.position] || 0) + 1;
      return acc;
    }, {});

    // Basic validation - adjust rules as needed
    if (!positions['GK'] || positions['GK'] !== 1) {
      throw new Error('Team must have exactly 1 goalkeeper');
    }

    if (!positions['DEF'] || positions['DEF'] < 3 || positions['DEF'] > 5) {
      throw new Error('Team must have 3-5 defenders');
    }

    if (!positions['MID'] || positions['MID'] < 3 || positions['MID'] > 5) {
      throw new Error('Team must have 3-5 midfielders');
    }

    if (!positions['FWD'] || positions['FWD'] < 1 || positions['FWD'] > 3) {
      throw new Error('Team must have 1-3 forwards');
    }

    // Calculate team budget (example: $100M budget)
    const totalCost = players.reduce((sum, player) => sum + Number(player.price), 0);
    const budget = 100; // $100M budget

    if (totalCost > budget) {
      throw new Error(`Team exceeds budget. Total cost: $${totalCost}M, Budget: $${budget}M`);
    }

    // Check team diversity (max 3 players from same team)
    const teamCounts = players.reduce((acc: Record<string, number>, player) => {
      acc[player.team] = (acc[player.team] || 0) + 1;
      return acc;
    }, {});

    const maxPlayersFromSameTeam = Math.max(...Object.values(teamCounts));
    if (maxPlayersFromSameTeam > 3) {
      throw new Error('Maximum 3 players allowed from the same team');
    }

    // Create fantasy team
    const { data: newTeam, error: teamError } = await supabaseService
      .from('fantasy_teams')
      .insert({
        user_id: user.id,
        contest_id: contestId,
        team_name: teamName,
        total_points: 0,
        status: 'active'
      })
      .select()
      .single();

    if (teamError || !newTeam) {
      throw new Error('Failed to create fantasy team');
    }

    // Add players to team
    const teamPlayerInserts = selectedPlayers.map(selection => ({
      fantasy_team_id: newTeam.id,
      player_id: selection.playerId,
      is_captain: selection.isCaptain || false,
      is_vice_captain: selection.isViceCaptain || false
    }));

    const { error: playersInsertError } = await supabaseService
      .from('team_players')
      .insert(teamPlayerInserts);

    if (playersInsertError) {
      // Rollback team creation
      await supabaseService
        .from('fantasy_teams')
        .delete()
        .eq('id', newTeam.id);
      
      throw new Error('Failed to add players to team');
    }

    console.log(`Fantasy team created successfully: ${newTeam.id}`);

    // Prepare response data
    const teamDetails = {
      teamId: newTeam.id,
      teamName: teamName,
      contestId: contestId,
      contestName: contest.name,
      players: players.map(player => {
        const selection = selectedPlayers.find(s => s.playerId === player.id);
        return {
          ...player,
          isCaptain: selection?.isCaptain || false,
          isViceCaptain: selection?.isViceCaptain || false
        };
      }),
      totalCost: totalCost,
      budget: budget,
      remainingBudget: budget - totalCost
    };

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Fantasy team created successfully',
        data: teamDetails
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );

  } catch (error: any) {
    console.error('Create team error:', error.message);
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