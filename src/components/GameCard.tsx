
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Clock, Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';

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
  return (
    <Card className="game-card overflow-hidden hover:neon-glow transition-all duration-300 group">
      <div className="relative">
        <img 
          src={image} 
          alt={title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 left-4">
          <span className="px-2 py-1 bg-purple-500/80 text-white text-xs rounded-full backdrop-blur-sm">
            {category}
          </span>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
          {title}
        </h3>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-gray-400 text-sm">
            <Users className="w-4 h-4 mr-2" />
            <span>{players} players</span>
          </div>
          <div className="flex items-center text-gray-400 text-sm">
            <Clock className="w-4 h-4 mr-2" />
            <span>{timeLeft}</span>
          </div>
          <div className="flex items-center text-yellow-400 text-sm">
            <Trophy className="w-4 h-4 mr-2" />
            <span>{prizePool}</span>
          </div>
        </div>
        
        <Link to={`/fantasy/${id}`}>
          <Button className="w-full gaming-gradient hover:opacity-80 transition-opacity">
            Create Team
          </Button>
        </Link>
      </div>
    </Card>
  );
};

export default GameCard;
