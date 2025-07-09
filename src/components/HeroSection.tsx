import { Button } from '@/components/ui/button';
import { Gamepad2, TrendingUp, Users, Sparkles, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <div className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-30"
        >
          <source src="https://player.vimeo.com/external/434045526.sd.mp4?s=c27eecc69a27dbc4ff2b87d38afc35f1a9e7c02d&profile_id=139&oauth2_token_id=57447761" type="video/mp4" />
          <source src="https://assets.mixkit.co/videos/preview/mixkit-set-of-plateaus-seen-from-the-heights-in-a-sunset-26070-large.mp4" type="video/mp4" />
        </video>
        
        {/* Video Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-purple-900/50 to-black/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/60" />
      </div>

      {/* Animated Particles */}
      <div className="absolute inset-0 z-10">
        <div className="absolute top-20 left-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-2000" />
        
        {/* Floating Gaming Elements */}
        <div className="absolute top-1/4 left-1/4 text-purple-400/20 text-6xl animate-bounce">⚔️</div>
        <div className="absolute top-3/4 right-1/3 text-orange-400/20 text-4xl animate-pulse delay-500">🎮</div>
        <div className="absolute bottom-1/4 left-1/3 text-cyan-400/20 text-5xl animate-bounce delay-1000">🏆</div>
      </div>
      
      <div className="relative z-20 max-w-6xl mx-auto px-4 text-center">
        <div className="inline-flex items-center justify-center p-3 bg-gradient-to-r from-purple-500/30 to-orange-500/30 rounded-full mb-8 border border-purple-500/40 backdrop-blur-sm">
          <Sparkles className="w-6 h-6 text-orange-400 mr-2 animate-pulse" />
          <span className="text-orange-400 font-bold text-lg tracking-wider">FANTASY ESPORTS REVOLUTION</span>
          <Sparkles className="w-6 h-6 text-orange-400 ml-2 animate-pulse" />
        </div>
        
        <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight">
          <span className="bg-gradient-to-r from-orange-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent animate-pulse drop-shadow-2xl">
            E-CRAZE
          </span>
        </h1>
        
        <p className="text-2xl md:text-3xl font-bold text-white mb-6 drop-shadow-lg">
          <span className="bg-gradient-to-r from-purple-300 to-cyan-300 bg-clip-text text-transparent">
            The Ultimate Fantasy Esports Arena
          </span>
        </p>
        
        <p className="text-xl text-gray-200 mb-12 max-w-4xl mx-auto leading-relaxed drop-shadow-md">
          Forge legendary teams, conquer epic tournaments, and claim your throne in the 
          most immersive fantasy esports universe. Where champions are born and legends never die.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
          <Link to="/games">
            <Button 
              size="lg" 
              className="group bg-gradient-to-r from-orange-600 to-purple-600 hover:from-orange-700 hover:to-purple-700 text-white px-10 py-4 text-xl font-bold rounded-xl shadow-2xl hover:shadow-orange-500/25 transition-all duration-300 transform hover:scale-105 backdrop-blur-sm border border-white/20"
            >
              <Gamepad2 className="w-6 h-6 mr-3 group-hover:rotate-12 transition-transform" />
              Enter the Arena
              <Zap className="w-6 h-6 ml-3 group-hover:scale-110 transition-transform" />
            </Button>
          </Link>
          <Button 
            variant="outline" 
            size="lg" 
            className="group px-10 py-4 text-xl font-bold border-2 border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/20 hover:border-cyan-500 rounded-xl transition-all duration-300 transform hover:scale-105 backdrop-blur-sm bg-black/20"
          >
            <TrendingUp className="w-6 h-6 mr-3 group-hover:rotate-12 transition-transform" />
            Live Tournaments
          </Button>
        </div>
        
        {/* Enhanced Stats with Glass Effect */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="group text-center p-6 rounded-2xl bg-gradient-to-b from-cyan-900/30 to-transparent border border-cyan-500/30 hover:border-cyan-500/50 transition-all duration-300 transform hover:scale-105 backdrop-blur-md">
            <div className="text-4xl font-bold text-cyan-400 mb-3 group-hover:scale-110 transition-transform drop-shadow-lg">2.5M+</div>
            <div className="text-gray-200 font-semibold">Active Warriors</div>
          </div>
          <div className="group text-center p-6 rounded-2xl bg-gradient-to-b from-orange-900/30 to-transparent border border-orange-500/30 hover:border-orange-500/50 transition-all duration-300 transform hover:scale-105 backdrop-blur-md">
            <div className="text-4xl font-bold text-orange-400 mb-3 group-hover:scale-110 transition-transform drop-shadow-lg">$50M+</div>
            <div className="text-gray-200 font-semibold">Epic Rewards</div>
          </div>
          <div className="group text-center p-6 rounded-2xl bg-gradient-to-b from-purple-900/30 to-transparent border border-purple-500/30 hover:border-purple-500/50 transition-all duration-300 transform hover:scale-105 backdrop-blur-md">
            <div className="text-4xl font-bold text-purple-400 mb-3 group-hover:scale-110 transition-transform drop-shadow-lg">25+</div>
            <div className="text-gray-200 font-semibold">Battle Arenas</div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;