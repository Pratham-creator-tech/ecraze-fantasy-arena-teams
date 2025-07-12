
import { Button } from '@/components/ui/button';
import { Gamepad2, TrendingUp, Users, Sparkles, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import heroBackground from '@/assets/hero-background.jpg';

const HeroSection = () => {
  return (
    <div className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${heroBackground})`,
          filter: 'brightness(0.7)'
        }}
      />
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy-blue/40 via-steel-blue/30 to-transparent" />
      <div className="absolute top-20 left-10 w-96 h-96 bg-gaming-gold/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-gaming-orange/10 rounded-full blur-3xl animate-pulse delay-1000" />
      
      <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
        <div className="inline-flex items-center justify-center p-3 bg-gradient-to-r from-gaming-gold/20 to-gaming-orange/20 rounded-full mb-8 border border-gaming-gold/30">
          <Sparkles className="w-6 h-6 text-gaming-gold mr-2 animate-pulse" />
          <span className="text-gaming-gold font-bold text-lg tracking-wider">DISCOVER THE FUTURE OF E-SPORTS</span>
          <Sparkles className="w-6 h-6 text-gaming-gold ml-2 animate-pulse" />
        </div>
        
        <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight">
          <span className="bg-gradient-to-r from-gaming-gold via-gaming-orange to-white bg-clip-text text-transparent">
            E-CRAZE
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl font-semibold text-white/90 mb-6">
          Welcome to E-Craze, the ultimate esports fantasy website where you can immerse yourself in the thrill of competitive gaming
        </p>
        
        <p className="text-xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
          Forge legendary teams, conquer epic tournaments, and claim your throne in the 
          most immersive fantasy esports universe. Where champions are born and legends never die.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
          <Link to="/games">
            <Button 
              size="lg" 
              className="group bg-gradient-to-r from-gaming-gold to-gaming-orange hover:from-gaming-gold/90 hover:to-gaming-orange/90 text-navy-blue px-10 py-4 text-xl font-bold rounded-xl shadow-2xl hover:shadow-gaming-gold/25 transition-all duration-300 transform hover:scale-105"
            >
              <Gamepad2 className="w-6 h-6 mr-3 group-hover:rotate-12 transition-transform" />
              Join Now
              <Zap className="w-6 h-6 ml-3 group-hover:scale-110 transition-transform" />
            </Button>
          </Link>
          <Button 
            variant="outline" 
            size="lg" 
            className="group px-10 py-4 text-xl font-bold border-2 border-gaming-gold/50 text-gaming-gold hover:bg-gaming-gold/10 hover:border-gaming-gold rounded-xl transition-all duration-300 transform hover:scale-105"
          >
            <TrendingUp className="w-6 h-6 mr-3 group-hover:rotate-12 transition-transform" />
            Live Tournaments
          </Button>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="group text-center p-6 rounded-2xl bg-gradient-to-b from-steel-blue/30 to-transparent border border-gaming-gold/20 hover:border-gaming-gold/40 transition-all duration-300 transform hover:scale-105 backdrop-blur-sm">
            <div className="text-4xl font-bold text-gaming-gold mb-3 group-hover:scale-110 transition-transform">2.5M+</div>
            <div className="text-white/80 font-semibold">Active Warriors</div>
          </div>
          <div className="group text-center p-6 rounded-2xl bg-gradient-to-b from-steel-blue/30 to-transparent border border-gaming-gold/20 hover:border-gaming-gold/40 transition-all duration-300 transform hover:scale-105 backdrop-blur-sm">
            <div className="text-4xl font-bold text-gaming-gold mb-3 group-hover:scale-110 transition-transform">$50M+</div>
            <div className="text-white/80 font-semibold">Epic Rewards</div>
          </div>
          <div className="group text-center p-6 rounded-2xl bg-gradient-to-b from-steel-blue/30 to-transparent border border-gaming-gold/20 hover:border-gaming-gold/40 transition-all duration-300 transform hover:scale-105 backdrop-blur-sm">
            <div className="text-4xl font-bold text-gaming-gold mb-3 group-hover:scale-110 transition-transform">25+</div>
            <div className="text-white/80 font-semibold">Battle Arenas</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
