import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Trophy, Users, DollarSign, Clock, Target, Zap } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface Contest {
  id: string;
  name: string;
  entryFee: number;
  prizePool: number;
  maxParticipants: number;
  currentParticipants: number;
  timeLeft: string;
  difficulty: 'Beginner' | 'Pro' | 'Expert';
  type: 'Head to Head' | 'Multi Entry' | 'Single Entry';
}

interface ContestModalProps {
  isOpen: boolean;
  onClose: () => void;
  gameId: string;
  gameTitle: string;
}

const ContestModal = ({ isOpen, onClose, gameId, gameTitle }: ContestModalProps) => {
  const [selectedContest, setSelectedContest] = useState<any>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [contests, setContests] = useState<any[]>([]);
  const [myContests, setMyContests] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (isOpen) {
      loadContests();
      loadMyContests();
    }
  }, [isOpen, gameId]);

  const loadContests = async () => {
    try {
      const { data, error } = await supabase
        .from('contests')
        .select('*')
        .eq('game_id', gameId)
        .eq('status', 'open');

      if (error) {
        console.error('Error loading contests:', error);
        return;
      }

      setContests(data || []);
    } catch (error) {
      console.error('Error loading contests:', error);
    }
  };

  const loadMyContests = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('contest_entries')
        .select(`
          *,
          contests (
            name,
            game_id
          ),
          fantasy_teams (
            team_name,
            total_points,
            rank
          )
        `)
        .eq('user_id', user.id);

      if (error) {
        console.error('Error loading my contests:', error);
        return;
      }

      setMyContests(data || []);
    } catch (error) {
      console.error('Error loading my contests:', error);
    }
  };

  const handleJoinContest = (contest: any) => {
    setSelectedContest(contest);
    setShowConfirmation(true);
  };

  const confirmJoinContest = async () => {
    if (!selectedContest) return;
    setLoading(true);

    try {
      // First create a fantasy team, then join the contest
      const { data: teamData, error: teamError } = await supabase.functions.invoke('create-fantasy-team', {
        body: { 
          contest_id: selectedContest.id,
          team_name: `Team ${Date.now()}` // Simple team name for now
        }
      });

      if (teamError) {
        toast({
          title: "Failed to create team",
          description: teamError.message,
          variant: "destructive"
        });
        return;
      }

      // Join the contest
      const { data, error } = await supabase.functions.invoke('join-contest', {
        body: { 
          contest_id: selectedContest.id,
          fantasy_team_id: teamData.team_id
        }
      });

      if (error) {
        toast({
          title: "Failed to join contest",
          description: error.message,
          variant: "destructive"
        });
        return;
      }

      toast({
        title: "Contest Joined!",
        description: `You've successfully joined "${selectedContest.name}". Entry fee of $${selectedContest.entry_fee || selectedContest.entryFee} deducted.`,
      });
      
      setShowConfirmation(false);
      onClose();
      
      // Reload data
      loadContests();
      loadMyContests();
    } catch (error: any) {
      toast({
        title: "Error joining contest",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-500';
      case 'Pro': return 'bg-yellow-500';
      case 'Expert': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Head to Head': return <Target className="w-4 h-4" />;
      case 'Multi Entry': return <Users className="w-4 h-4" />;
      case 'Single Entry': return <Zap className="w-4 h-4" />;
      default: return <Trophy className="w-4 h-4" />;
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="game-card max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
              {gameTitle} - Select Contest
            </DialogTitle>
          </DialogHeader>

          <Tabs defaultValue="contests" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="contests">Available Contests</TabsTrigger>
              <TabsTrigger value="my-contests">My Contests</TabsTrigger>
            </TabsList>

            <TabsContent value="contests" className="space-y-4">
              <div className="grid gap-4">
                {contests.map((contest) => (
                  <Card key={contest.id} className="p-4 game-card hover:neon-glow-cyan transition-all">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-bold text-white">{contest.name}</h3>
                          <Badge className={`${getDifficultyColor(contest.difficulty)} text-white`}>
                            {contest.difficulty}
                          </Badge>
                          <div className="flex items-center gap-1 text-gray-400">
                            {getTypeIcon(contest.type)}
                            <span className="text-xs">{contest.type}</span>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div className="flex items-center text-gray-300">
                            <DollarSign className="w-4 h-4 mr-1" />
                            <span>Entry: ${contest.entry_fee}</span>
                          </div>
                          <div className="flex items-center text-yellow-400">
                            <Trophy className="w-4 h-4 mr-1" />
                            <span>Prize: ${contest.prize_pool?.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center text-gray-300">
                            <Users className="w-4 h-4 mr-1" />
                            <span>{contest.current_participants}/{contest.max_participants}</span>
                          </div>
                          <div className="flex items-center text-gray-300">
                            <Clock className="w-4 h-4 mr-1" />
                            <span>Deadline: {new Date(contest.deadline).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="ml-4">
                        <Button
                          onClick={() => handleJoinContest(contest)}
                          className="gaming-gradient neon-glow"
                          disabled={contest.current_participants >= contest.max_participants}
                        >
                          {contest.entry_fee === 0 ? 'Join Free' : `Join $${contest.entry_fee}`}
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="my-contests" className="space-y-4">
              <div className="grid gap-4">
                {myContests.map((contest) => (
                  <Card key={contest.id} className="p-4 game-card">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-bold text-white">{contest.name}</h3>
                          <Badge variant={contest.status === 'Live' ? 'default' : 'secondary'}>
                            {contest.status}
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div className="flex items-center text-gray-300">
                            <span>Rank: #{contest.rank}</span>
                          </div>
                          <div className="flex items-center text-gray-300">
                            <span>Points: {contest.points}</span>
                          </div>
                          <div className="flex items-center text-gray-300">
                            <span>Participants: {contest.totalParticipants}</span>
                          </div>
                          <div className="flex items-center text-yellow-400">
                            <span>Won: ${contest.prizeWon}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="ml-4">
                        <Button variant="outline" className="border-accent/50 text-accent">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>

      <AlertDialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <AlertDialogContent className="game-card">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl font-bold text-white">
              Confirm Contest Entry
            </AlertDialogTitle>
            <AlertDialogDescription className="text-gray-400">
              {selectedContest && (
                <>
                  You're about to join "<span className="text-white font-semibold">{selectedContest.name}</span>" 
                  {selectedContest.entryFee > 0 && (
                    <> for an entry fee of <span className="text-yellow-400 font-semibold">${selectedContest.entryFee}</span></>
                  )}. 
                  Are you sure you want to continue?
                </>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-gray-500 text-gray-300">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmJoinContest}
              className="gaming-gradient"
            >
              Confirm & Join
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ContestModal;