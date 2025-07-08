import { useParams, Navigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Users, Trophy, Clock, Star, Target, Gamepad2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const TournamentDetails = () => {
  const { id } = useParams();
  const { toast } = useToast();

  const tournaments = [
    {
      id: '1',
      name: 'VALORANT Champions Tour',
      game: 'VALORANT',
      status: 'Live',
      startDate: '2024-01-15',
      endDate: '2024-01-28',
      prize: '$100,000',
      participants: '2.1M',
      entryFee: 25,
      description: 'The biggest VALORANT tournament of the year featuring the best teams from around the world.',
      rules: [
        'Team must consist of 5 players',
        'Budget limit: $1000 per team',
        'Substitutions allowed once per round',
        'Points based on kills, assists, and match wins'
      ],
      image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=400&fit=crop'
    },
    {
      id: '2',
      name: 'League of Legends World Championship',
      game: 'League of Legends',
      status: 'Starting Soon',
      startDate: '2024-01-20',
      endDate: '2024-02-05',
      prize: '$250,000',
      participants: '3.2M',
      entryFee: 50,
      description: 'The ultimate League of Legends championship with massive prize pools and global competition.',
      rules: [
        'Team must consist of 5 players + 1 substitute',
        'Budget limit: $1500 per team',
        'No player changes after tournament starts',
        'Points based on KDA, CS, and objectives'
      ],
      image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&h=400&fit=crop'
    },
    {
      id: '3',
      name: 'CS2 Major Championship',
      game: 'CS2',
      status: 'Registration Open',
      startDate: '2024-02-01',
      endDate: '2024-02-15',
      prize: '$150,000',
      participants: '1.8M',
      entryFee: 30,
      description: 'The premier Counter-Strike tournament featuring legendary teams and incredible gameplay.',
      rules: [
        'Team must consist of 5 players',
        'Budget limit: $1200 per team',
        'Captain choice doubles points',
        'Points based on frags, MVPs, and round wins'
      ],
      image: 'https://images.unsplash.com/photo-1560419015-7c427e8ae5ba?w=800&h=400&fit=crop'
    }
  ];

  const tournament = tournaments.find(t => t.id === id);

  if (!tournament) {
    return <Navigate to="/tournaments" />;
  }

  const handleJoinTournament = () => {
    const walletBalance = parseFloat(localStorage.getItem('walletBalance') || '0');
    
    if (walletBalance >= tournament.entryFee) {
      const spendFromWallet = (window as any).spendFromWallet;
      if (spendFromWallet && spendFromWallet(tournament.entryFee)) {
        toast({
          title: "Tournament Joined!",
          description: `You've successfully joined ${tournament.name}. Entry fee of $${tournament.entryFee} deducted from your wallet.`,
        });
      }
    } else {
      toast({
        title: "Insufficient Funds",
        description: `You need $${tournament.entryFee} to join this tournament. Please add funds to your wallet.`,
        variant: "destructive"
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Live': return 'bg-neon-green text-black';
      case 'Starting Soon': return 'bg-gaming-gold text-black';
      case 'Registration Open': return 'bg-neon-cyan text-black';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="relative rounded-2xl overflow-hidden mb-8">
          <img 
            src={tournament.image} 
            alt={tournament.name}
            className="w-full h-80 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
          <div className="absolute bottom-8 left-8 right-8">
            <div className="flex items-center space-x-3 mb-4">
              <h1 className="text-4xl font-bold text-white">{tournament.name}</h1>
              <Badge className={getStatusColor(tournament.status)}>
                {tournament.status}
              </Badge>
            </div>
            <p className="text-gray-300 text-lg max-w-2xl">
              {tournament.description}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Tournament Info */}
            <Card className="tournament-card p-6">
              <h2 className="text-2xl font-bold mb-6 text-white">Tournament Details</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <Calendar className="w-8 h-8 mx-auto mb-2 text-accent" />
                  <div className="text-xs text-muted-foreground">Start Date</div>
                  <div className="font-semibold">{new Date(tournament.startDate).toLocaleDateString()}</div>
                </div>
                <div className="text-center">
                  <Trophy className="w-8 h-8 mx-auto mb-2 text-gaming-gold" />
                  <div className="text-xs text-muted-foreground">Prize Pool</div>
                  <div className="font-semibold text-gaming-gold">{tournament.prize}</div>
                </div>
                <div className="text-center">
                  <Users className="w-8 h-8 mx-auto mb-2 text-primary" />
                  <div className="text-xs text-muted-foreground">Participants</div>
                  <div className="font-semibold">{tournament.participants}</div>
                </div>
                <div className="text-center">
                  <Clock className="w-8 h-8 mx-auto mb-2 text-neon-green" />
                  <div className="text-xs text-muted-foreground">Entry Fee</div>
                  <div className="font-semibold text-neon-green">${tournament.entryFee}</div>
                </div>
              </div>
            </Card>

            {/* Rules */}
            <Card className="tournament-card p-6">
              <h3 className="text-xl font-bold mb-4 text-white flex items-center">
                <Target className="w-5 h-5 mr-2 text-primary" />
                Tournament Rules
              </h3>
              <ul className="space-y-3">
                {tournament.rules.map((rule, index) => (
                  <li key={index} className="flex items-start">
                    <Star className="w-4 h-4 mt-1 mr-3 text-accent flex-shrink-0" />
                    <span className="text-gray-300">{rule}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Join Tournament */}
            <Card className="tournament-card p-6">
              <h3 className="text-xl font-bold mb-4 text-white">Join Tournament</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Entry Fee:</span>
                  <span className="text-2xl font-bold text-neon-green">${tournament.entryFee}</span>
                </div>
                <Button 
                  onClick={handleJoinTournament}
                  className="w-full gaming-gradient-gold neon-glow text-lg py-3"
                >
                  <Gamepad2 className="w-5 h-5 mr-2" />
                  Join Now
                </Button>
                <p className="text-xs text-muted-foreground text-center">
                  Funds will be deducted from your wallet upon joining
                </p>
              </div>
            </Card>

            {/* Quick Stats */}
            <Card className="tournament-card p-6">
              <h3 className="text-xl font-bold mb-4 text-white">Quick Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-300">Game:</span>
                  <span className="font-semibold text-primary">{tournament.game}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Duration:</span>
                  <span className="font-semibold">14 days</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Teams Joined:</span>
                  <span className="font-semibold text-accent">12,450</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Max Teams:</span>
                  <span className="font-semibold">Unlimited</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TournamentDetails;