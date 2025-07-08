
import Navigation from '@/components/Navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Users, Trophy, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const Tournaments = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const tournaments = [
    {
      id: 1,
      name: 'VALORANT Champions Tour',
      game: 'VALORANT',
      status: 'Live',
      startDate: '2024-01-15',
      endDate: '2024-01-28',
      prize: '$100,000',
      participants: '2.1M',
      entryFee: '$25',
      description: 'The biggest VALORANT tournament of the year featuring the best teams from around the world.'
    },
    {
      id: 2,
      name: 'League of Legends World Championship',
      game: 'League of Legends',
      status: 'Starting Soon',
      startDate: '2024-01-20',
      endDate: '2024-02-05',
      prize: '$250,000',
      participants: '3.2M',
      entryFee: '$50',
      description: 'The ultimate League of Legends championship with massive prize pools and global competition.'
    },
    {
      id: 3,
      name: 'CS2 Major Championship',
      game: 'CS2',
      status: 'Registration Open',
      startDate: '2024-02-01',
      endDate: '2024-02-15',
      prize: '$150,000',
      participants: '1.8M',
      entryFee: '$30',
      description: 'The premier Counter-Strike tournament featuring legendary teams and incredible gameplay.'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Live': return 'bg-green-500';
      case 'Starting Soon': return 'bg-yellow-500';
      case 'Registration Open': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Tournaments
            </span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Compete in the biggest esports tournaments with massive prize pools and global recognition.
          </p>
        </div>

        {/* Tournament Cards */}
        <div className="space-y-8">
          {tournaments.map((tournament) => (
            <Card key={tournament.id} className="game-card p-8">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                <div className="flex-1 mb-6 lg:mb-0">
                  <div className="flex items-center space-x-3 mb-4">
                    <h2 className="text-2xl font-bold text-white">{tournament.name}</h2>
                    <Badge className={`${getStatusColor(tournament.status)} text-white`}>
                      {tournament.status}
                    </Badge>
                  </div>
                  
                  <p className="text-gray-400 mb-4 max-w-2xl">
                    {tournament.description}
                  </p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="flex items-center text-gray-300">
                      <Calendar className="w-4 h-4 mr-2" />
                      <div>
                        <div className="text-xs text-gray-400">Start Date</div>
                        <div className="text-sm">{new Date(tournament.startDate).toLocaleDateString()}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center text-gray-300">
                      <Trophy className="w-4 h-4 mr-2" />
                      <div>
                        <div className="text-xs text-gray-400">Prize Pool</div>
                        <div className="text-sm font-bold text-yellow-400">{tournament.prize}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center text-gray-300">
                      <Users className="w-4 h-4 mr-2" />
                      <div>
                        <div className="text-xs text-gray-400">Participants</div>
                        <div className="text-sm">{tournament.participants}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center text-gray-300">
                      <Clock className="w-4 h-4 mr-2" />
                      <div>
                        <div className="text-xs text-gray-400">Entry Fee</div>
                        <div className="text-sm font-bold text-green-400">{tournament.entryFee}</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col space-y-3 lg:ml-8">
                  <Button 
                    className="gaming-gradient neon-glow"
                    onClick={() => {
                      const walletBalance = parseFloat(localStorage.getItem('walletBalance') || '0');
                      const entryFee = parseFloat(tournament.entryFee.replace('$', ''));
                      
                      if (walletBalance >= entryFee) {
                        const spendFromWallet = (window as any).spendFromWallet;
                        if (spendFromWallet && spendFromWallet(entryFee)) {
                          toast({
                            title: "Tournament Joined!",
                            description: `You've successfully joined ${tournament.name}. Entry fee of $${entryFee} deducted from your wallet.`,
                          });
                        }
                      } else {
                        toast({
                          title: "Insufficient Funds",
                          description: `You need $${entryFee} to join this tournament. Please add funds to your wallet.`,
                          variant: "destructive"
                        });
                      }
                    }}
                  >
                    Join Tournament
                  </Button>
                  <Button 
                    variant="outline" 
                    className="border-purple-500/50 hover:bg-purple-500/10"
                    onClick={() => navigate(`/tournament/${tournament.id}`)}
                  >
                    View Details
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Upcoming Tournaments */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold mb-8 text-center">
            <span className="bg-gradient-to-r from-pink-400 to-cyan-500 bg-clip-text text-transparent">
              Upcoming Events
            </span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="game-card p-6 text-center">
                <div className="w-16 h-16 gaming-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                  <Trophy className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">More Tournaments Coming Soon</h3>
                <p className="text-gray-400 mb-4">
                  Stay tuned for more exciting tournaments across all your favorite games.
                </p>
                <Button variant="outline" className="border-purple-500/50 text-purple-400">
                  Get Notified
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tournaments;
