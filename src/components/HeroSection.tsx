
import { Button } from '@/components/ui/button';
import { Gamepad2, TrendingUp, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <div className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-pink-900/20" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      
      <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            E-CRAZE
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-300 mb-4">
          The Ultimate Fantasy Esports Experience
        </p>
        
        <p className="text-lg text-gray-400 mb-8 max-w-3xl mx-auto">
          Create your dream teams, compete in tournaments, and dominate the leaderboards 
          across all your favorite esports games. Join millions of players in the most 
          exciting fantasy esports platform.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link to="/games">
            <Button size="lg" className="gaming-gradient neon-glow px-8 py-3 text-lg">
              <Gamepad2 className="w-5 h-5 mr-2" />
              Start Playing
            </Button>
          </Link>
          <Button variant="outline" size="lg" className="px-8 py-3 text-lg border-purple-500/50 hover:bg-purple-500/10">
            <TrendingUp className="w-5 h-5 mr-2" />
            View Tournaments
          </Button>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-3xl font-bold text-cyan-400 mb-2">2.5M+</div>
            <div className="text-gray-400">Active Players</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-400 mb-2">$50M+</div>
            <div className="text-gray-400">Prize Pool</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-pink-400 mb-2">25+</div>
            <div className="text-gray-400">Games Supported</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
