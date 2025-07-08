
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Users, DollarSign, Star, TrendingUp } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const FantasyTeam = () => {
  const { gameId } = useParams();
  const { toast } = useToast();
  const [budget, setBudget] = useState(100000);
  const [selectedPlayers, setSelectedPlayers] = useState<any[]>([]);
  const [teamName, setTeamName] = useState('');

  // Mock player data - would come from API based on gameId
  const players = [
    { id: 1, name: 'TenZ', team: 'Sentinels', role: 'Duelist', price: 15000, points: 89.5, form: 'hot' },
    { id: 2, name: 'aspas', team: 'LOUD', role: 'Duelist', price: 14500, points: 87.2, form: 'hot' },
    { id: 3, name: 'Chronicle', team: 'Fnatic', role: 'Initiator', price: 13000, points: 82.1, form: 'good' },
    { id: 4, name: 'Demon1', team: 'EG', role: 'Duelist', price: 12500, points: 79.8, form: 'good' },
    { id: 5, name: 'Less', team: 'LOUD', role: 'Sentinel', price: 11000, points: 75.4, form: 'average' },
    { id: 6, name: 'FNS', team: 'NRG', role: 'IGL', price: 9500, points: 68.9, form: 'average' },
  ];

  const getGameTitle = (id: string) => {
    const gameMap: { [key: string]: string } = {
      'valorant': 'VALORANT',
      'lol': 'League of Legends',
      'csgo': 'CS2',
      'dota2': 'Dota 2',
      'apex': 'Apex Legends',
      'rocket-league': 'Rocket League'
    };
    return gameMap[id] || 'Unknown Game';
  };

  const addPlayer = (player: any) => {
    if (selectedPlayers.length < 5 && budget >= player.price) {
      setSelectedPlayers([...selectedPlayers, player]);
      setBudget(budget - player.price);
    }
  };

  const removePlayer = (playerId: number) => {
    const player = selectedPlayers.find(p => p.id === playerId);
    if (player) {
      setSelectedPlayers(selectedPlayers.filter(p => p.id !== playerId));
      setBudget(budget + player.price);
    }
  };

  const getFormColor = (form: string) => {
    switch (form) {
      case 'hot': return 'bg-green-500';
      case 'good': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">
            <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Create {getGameTitle(gameId || '')} Team
            </span>
          </h1>
          <p className="text-gray-400">Build your dream team within the budget constraints</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Team Builder */}
          <div className="lg:col-span-2">
            <Card className="p-6 mb-6 game-card">
              <h2 className="text-2xl font-bold mb-4 text-white">Available Players</h2>
              <div className="space-y-3">
                {players.map((player) => (
                  <div 
                    key={player.id}
                    className="flex items-center justify-between p-4 bg-black/20 rounded-lg border border-purple-500/20 hover:border-purple-500/40 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="flex flex-col">
                        <div className="flex items-center space-x-2">
                          <span className="font-bold text-white">{player.name}</span>
                          <Badge variant="outline" className="text-xs">
                            {player.role}
                          </Badge>
                          <div className={`w-2 h-2 rounded-full ${getFormColor(player.form)}`} />
                        </div>
                        <span className="text-gray-400 text-sm">{player.team}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <div className="text-yellow-400 font-bold">${player.price.toLocaleString()}</div>
                        <div className="text-gray-400 text-sm flex items-center">
                          <TrendingUp className="w-3 h-3 mr-1" />
                          {player.points} pts
                        </div>
                      </div>
                      <Button
                        onClick={() => addPlayer(player)}
                        disabled={selectedPlayers.length >= 5 || budget < player.price || selectedPlayers.some(p => p.id === player.id)}
                        size="sm"
                        className="gaming-gradient"
                      >
                        Add
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Team Summary */}
          <div className="space-y-6">
            <Card className="p-6 game-card">
              <h3 className="text-xl font-bold mb-4 text-white">Team Summary</h3>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Budget Remaining:</span>
                  <span className="text-green-400 font-bold">${budget.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Players Selected:</span>
                  <span className="text-cyan-400 font-bold">{selectedPlayers.length}/5</span>
                </div>
              </div>

              <Input
                placeholder="Enter team name..."
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                className="mb-4 bg-black/20 border-purple-500/20"
              />

              <div className="space-y-2 mb-6">
                <h4 className="font-semibold text-white">Selected Players:</h4>
                {selectedPlayers.length === 0 ? (
                  <p className="text-gray-400 text-sm">No players selected</p>
                ) : (
                  selectedPlayers.map((player) => (
                    <div key={player.id} className="flex justify-between items-center p-2 bg-black/10 rounded">
                      <div>
                        <span className="text-white text-sm">{player.name}</span>
                        <Badge variant="outline" className="ml-2 text-xs">
                          {player.role}
                        </Badge>
                      </div>
                      <Button
                        onClick={() => removePlayer(player.id)}
                        variant="destructive"
                        size="sm"
                      >
                        Remove
                      </Button>
                    </div>
                  ))
                )}
              </div>

              <Button
                className="w-full gaming-gradient neon-glow"
                disabled={selectedPlayers.length !== 5 || !teamName.trim()}
                onClick={() => {
                  const entryFee = 10;
                  const walletBalance = parseFloat(localStorage.getItem('walletBalance') || '0');
                  
                  if (walletBalance >= entryFee) {
                    const spendFromWallet = (window as any).spendFromWallet;
                    if (spendFromWallet && spendFromWallet(entryFee)) {
                      toast({
                        title: "Team Created Successfully!",
                        description: `Your team "${teamName}" has been created for ${getGameTitle(gameId || '')}. Entry fee of $${entryFee} deducted from your wallet.`,
                      });
                      // Reset form
                      setSelectedPlayers([]);
                      setTeamName('');
                      setBudget(100000);
                    }
                  } else {
                    toast({
                      title: "Insufficient Funds",
                      description: `You need $${entryFee} to create a team. Please add funds to your wallet.`,
                      variant: "destructive"
                    });
                  }
                }}
              >
                <Users className="w-4 h-4 mr-2" />
                Create Team
              </Button>
            </Card>

            <Card className="p-6 game-card">
              <h3 className="text-xl font-bold mb-4 text-white">Contest Info</h3>
              <div className="space-y-3">
                <div className="flex items-center text-gray-300">
                  <DollarSign className="w-4 h-4 mr-2" />
                  <span>Entry Fee: $10</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <Star className="w-4 h-4 mr-2" />
                  <span>Prize Pool: $100,000</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <Users className="w-4 h-4 mr-2" />
                  <span>Max Teams: 10,000</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FantasyTeam;
