
import Navigation from '@/components/Navigation';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Trophy, Medal, Award, TrendingUp } from 'lucide-react';

const Leaderboard = () => {
  const topPlayers = [
    {
      rank: 1,
      username: 'ProGamer2024',
      points: 15420,
      winRate: 87.5,
      totalWinnings: 125000,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      badge: 'Champion'
    },
    {
      rank: 2,
      username: 'EsportsKing',
      points: 14890,
      winRate: 84.2,
      totalWinnings: 98000,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      badge: 'Master'
    },
    {
      rank: 3,
      username: 'FantasyLegend',
      points: 14320,
      winRate: 82.1,
      totalWinnings: 87500,
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b332c3cc?w=100&h=100&fit=crop&crop=face',
      badge: 'Master'
    }
  ];

  const leaderboardData = [
    ...topPlayers,
    {
      rank: 4,
      username: 'GamingGuru',
      points: 13750,
      winRate: 79.8,
      totalWinnings: 65000,
      avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&h=100&fit=crop&crop=face',
      badge: 'Expert'
    },
    {
      rank: 5,
      username: 'TourneyMaster',
      points: 13200,
      winRate: 77.3,
      totalWinnings: 52000,
      avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=100&h=100&fit=crop&crop=face',
      badge: 'Expert'
    },
    {
      rank: 6,
      username: 'CompetitivePro',
      points: 12890,
      winRate: 75.6,
      totalWinnings: 43000,
      avatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671d24?w=100&h=100&fit=crop&crop=face',
      badge: 'Expert'
    }
  ];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Trophy className="w-6 h-6 text-yellow-400" />;
      case 2: return <Medal className="w-6 h-6 text-gray-300" />;
      case 3: return <Award className="w-6 h-6 text-amber-600" />;
      default: return <span className="w-6 h-6 flex items-center justify-center text-gray-400 font-bold">#{rank}</span>;
    }
  };

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case 'Champion': return 'bg-yellow-500';
      case 'Master': return 'bg-purple-500';
      case 'Expert': return 'bg-blue-500';
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
              Leaderboard
            </span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            See how you stack up against the best fantasy esports players worldwide.
          </p>
        </div>

        {/* Top 3 Podium */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {topPlayers.map((player, index) => (
            <Card key={player.rank} className={`game-card p-8 text-center ${index === 0 ? 'neon-glow md:order-2' : index === 1 ? 'md:order-1' : 'md:order-3'}`}>
              <div className="relative mb-4">
                <Avatar className="w-20 h-20 mx-auto mb-2">
                  <AvatarImage src={player.avatar} alt={player.username} />
                  <AvatarFallback>{player.username.slice(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="absolute -top-2 -right-2">
                  {getRankIcon(player.rank)}
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-white mb-2">{player.username}</h3>
              <Badge className={`${getBadgeColor(player.badge)} text-white mb-4`}>
                {player.badge}
              </Badge>
              
              <div className="space-y-2">
                <div className="text-2xl font-bold text-cyan-400">
                  {player.points.toLocaleString()} pts
                </div>
                <div className="text-sm text-gray-400">
                  Win Rate: <span className="text-green-400">{player.winRate}%</span>
                </div>
                <div className="text-sm text-gray-400">
                  Total Winnings: <span className="text-yellow-400">${player.totalWinnings.toLocaleString()}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Full Leaderboard */}
        <Card className="game-card">
          <div className="p-6 border-b border-purple-500/20">
            <h2 className="text-2xl font-bold text-white">Global Rankings</h2>
          </div>
          
          <div className="divide-y divide-purple-500/10">
            {leaderboardData.map((player) => (
              <div key={player.rank} className="p-6 flex items-center justify-between hover:bg-purple-500/5 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center justify-center w-12">
                    {getRankIcon(player.rank)}
                  </div>
                  
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={player.avatar} alt={player.username} />
                    <AvatarFallback>{player.username.slice(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-white">{player.username}</span>
                      <Badge className={`${getBadgeColor(player.badge)} text-white text-xs`}>
                        {player.badge}
                      </Badge>
                    </div>
                    <div className="text-sm text-gray-400">
                      Win Rate: {player.winRate}%
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-8">
                  <div className="text-right">
                    <div className="text-cyan-400 font-bold">
                      {player.points.toLocaleString()} pts
                    </div>
                    <div className="text-sm text-gray-400 flex items-center">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      +127 this week
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-yellow-400 font-bold">
                      ${player.totalWinnings.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-400">Total Winnings</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Your Rank Card */}
        <Card className="game-card mt-8 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="text-4xl font-bold text-purple-400">#1,247</div>
              <div>
                <div className="text-white font-bold">Your Current Rank</div>
                <div className="text-gray-400">Keep playing to climb higher!</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-cyan-400 font-bold text-xl">8,450 pts</div>
              <div className="text-sm text-gray-400">+45 this week</div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Leaderboard;
