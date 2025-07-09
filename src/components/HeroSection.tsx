
import { Button } from '@/components/ui/button';
import { Gamepad2, TrendingUp, Users, Sparkles, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <div className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-orange-900/20 to-cyan-900/30" />
      <div className="absolute top-20 left-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-orange-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
      <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-cyan-500/15 rounded-full blur-3xl animate-pulse delay-2000" />
      
      <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
        <div className="inline-flex items-center justify-center p-3 bg-gradient-to-r from-purple-500/20 to-orange-500/20 rounded-full mb-8 border border-purple-500/30">
          <Sparkles className="w-6 h-6 text-orange-400 mr-2 animate-pulse" />
          <span className="text-orange-400 font-bold text-lg tracking-wider">FANTASY ESPORTS REVOLUTION</span>
          <Sparkles className="w-6 h-6 text-orange-400 ml-2 animate-pulse" />
        </div>
        
        <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight">
          <span className="bg-gradient-to-r from-orange-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent animate-pulse">
            E-CRAZE
          </span>
        </h1>
        
        <p className="text-2xl md:text-3xl font-bold text-white mb-6">
          <span className="bg-gradient-to-r from-purple-300 to-cyan-300 bg-clip-text text-transparent">
            The Ultimate Fantasy Esports Arena
          </span>
        </p>
        
        <p className="text-xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
          Forge legendary teams, conquer epic tournaments, and claim your throne in the 
          most immersive fantasy esports universe. Where champions are born and legends never die.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
          <Link to="/games">
            <Button 
              size="lg" 
              className="group bg-gradient-to-r from-orange-600 to-purple-600 hover:from-orange-700 hover:to-purple-700 text-white px-10 py-4 text-xl font-bold rounded-xl shadow-2xl hover:shadow-orange-500/25 transition-all duration-300 transform hover:scale-105"
            >
              <Gamepad2 className="w-6 h-6 mr-3 group-hover:rotate-12 transition-transform" />
              Enter the Arena
              <Zap className="w-6 h-6 ml-3 group-hover:scale-110 transition-transform" />
            </Button>
          </Link>
          <Button 
            variant="outline" 
            size="lg" 
            className="group px-10 py-4 text-xl font-bold border-2 border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-500 rounded-xl transition-all duration-300 transform hover:scale-105"
          >
            <TrendingUp className="w-6 h-6 mr-3 group-hover:rotate-12 transition-transform" />
            Live Tournaments
          </Button>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="group text-center p-6 rounded-2xl bg-gradient-to-b from-cyan-900/20 to-transparent border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300 transform hover:scale-105">
            <div className="text-4xl font-bold text-cyan-400 mb-3 group-hover:scale-110 transition-transform">2.5M+</div>
            <div className="text-gray-300 font-semibold">Active Warriors</div>
          </div>
          <div className="group text-center p-6 rounded-2xl bg-gradient-to-b from-orange-900/20 to-transparent border border-orange-500/20 hover:border-orange-500/40 transition-all duration-300 transform hover:scale-105">
            <div className="text-4xl font-bold text-orange-400 mb-3 group-hover:scale-110 transition-transform">$50M+</div>
            <div className="text-gray-300 font-semibold">Epic Rewards</div>
          </div>
          <div className="group text-center p-6 rounded-2xl bg-gradient-to-b from-purple-900/20 to-transparent border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 transform hover:scale-105">
            <div className="text-4xl font-bold text-purple-400 mb-3 group-hover:scale-110 transition-transform">25+</div>
            <div className="text-gray-300 font-semibold">Battle Arenas</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
