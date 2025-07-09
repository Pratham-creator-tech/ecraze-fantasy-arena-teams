
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Clock, Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';
import ContestModal from './ContestModal';
import AuthModal from './AuthModal';

interface GameCardProps {
  id: string;
  title: string;
  image: string;
  players: string;
  timeLeft: string;
  prizePool: string;
  category: string;
}

const GameCard = ({ id, title, image, players, timeLeft, prizePool, category }: GameCardProps) => {
  const [isContestModalOpen, setIsContestModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const handleCreateTeam = () => {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    if (isAuthenticated) {
      setIsContestModalOpen(true);
    } else {
      setIsAuthModalOpen(true);
    }
  };

  const handleAuthSuccess = () => {
    setIsAuthModalOpen(false);
    setIsContestModalOpen(true);
  };

  return (
    <Card className="relative overflow-hidden transition-all duration-500 group transform hover:scale-105 hover:rotate-1">
      {/* Animated Border */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/50 via-orange-600/50 to-cyan-600/50 rounded-lg blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500" />
      
      {/* Main Card */}
      <div className="relative bg-gradient-to-b from-gray-900/90 to-gray-800/90 backdrop-blur-sm rounded-lg border border-purple-500/20 group-hover:border-purple-500/40 overflow-hidden">
      <div className="relative">
        <img 
          src={image} 
          alt={title}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-gradient-to-r from-purple-600 to-orange-600 text-white text-xs font-bold rounded-full backdrop-blur-sm border border-white/20">
            {category}
          </span>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        
        {/* Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-t from-purple-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-4 group-hover:bg-gradient-to-r group-hover:from-orange-400 group-hover:to-purple-400 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
          {title}
        </h3>
        
        <div className="space-y-3 mb-6">
          <div className="flex items-center text-gray-300 text-sm font-medium">
            <Users className="w-4 h-4 mr-2 text-cyan-400" />
            <span>{players} players</span>
          </div>
          <div className="flex items-center text-gray-300 text-sm font-medium">
            <Clock className="w-4 h-4 mr-2 text-orange-400" />
            <span>{timeLeft}</span>
          </div>
          <div className="flex items-center text-sm font-bold">
            <Trophy className="w-4 h-4 mr-2 text-yellow-400" />
            <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">{prizePool}</span>
          </div>
        </div>
        
        <Button 
          onClick={handleCreateTeam}
          className="w-full group/btn bg-gradient-to-r from-purple-600 to-orange-600 hover:from-purple-700 hover:to-orange-700 text-white font-bold py-3 rounded-lg shadow-lg hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105"
        >
          <span className="group-hover/btn:scale-110 transition-transform duration-200">⚔️</span>
          <span className="mx-2">Create Team</span>
          <span className="group-hover/btn:scale-110 transition-transform duration-200">⚔️</span>
        </Button>
      </div>

        <ContestModal 
          isOpen={isContestModalOpen}
          onClose={() => setIsContestModalOpen(false)}
          gameId={id}
          gameTitle={title}
        />

        <AuthModal 
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
          onAuthSuccess={handleAuthSuccess}
        />
      </div>
      </div>
    </Card>
  );
};

export default GameCard;
