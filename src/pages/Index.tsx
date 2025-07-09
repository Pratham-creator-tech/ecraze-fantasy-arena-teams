import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import GameCard from '@/components/GameCard';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowRight, Star, Zap, Shield, Sword, Crown, Gamepad2, Trophy, Users, Target } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  const featuredGames = [
    {
      id: 'valorant',
      title: 'VALORANT Champions',
      image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=300&fit=crop',
      players: '1.2M',
      timeLeft: '2d 14h',
      prizePool: '$100,000',
      category: 'FPS'
    },
    {
      id: 'lol',
      title: 'League of Legends World Championship',
      image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=300&fit=crop',
      players: '2.1M',
      timeLeft: '5d 8h',
      prizePool: '$250,000',
      category: 'MOBA'
    },
    {
      id: 'csgo',
      title: 'CS2 Major Championship',
      image: 'https://images.unsplash.com/photo-1560419015-7c427e8ae5ba?w=400&h=300&fit=crop',
      players: '950K',
      timeLeft: '1d 22h',
      prizePool: '$150,000',
      category: 'FPS'
    }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-orange-500/5 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/3 rounded-full blur-3xl animate-pulse delay-2000" />
      </div>

      <Navigation />
      <HeroSection />
      
      {/* Featured Tournaments Section */}
      <section className="py-20 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center p-2 bg-gradient-to-r from-purple-500/10 to-orange-500/10 rounded-full mb-6 border border-purple-500/20">
              <Crown className="w-6 h-6 text-orange-400 mr-2" />
              <span className="text-orange-400 font-semibold">FEATURED TOURNAMENTS</span>
            </div>
            <h2 className="text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-orange-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
                Epic Battles Await
              </span>
            </h2>
            <p className="text-gray-400 text-lg max-w-3xl mx-auto leading-relaxed">
              Join the most prestigious tournaments in esports history. Compete against legends, 
              claim your throne, and earn rewards worthy of champions.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {featuredGames.map((game, index) => (
              <div 
                key={game.id} 
                className="transform hover:scale-105 transition-all duration-500"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <GameCard {...game} />
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <Link to="/games">
              <Button 
                size="lg" 
                className="group bg-gradient-to-r from-purple-600 to-orange-600 hover:from-purple-700 hover:to-orange-700 text-white px-8 py-4 text-lg font-bold rounded-xl shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105"
              >
                <Sword className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
                Enter the Arena
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 px-4 relative">
        {/* Decorative Elements */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/5 to-transparent" />
        
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center mb-20">
            <div className="inline-flex items-center justify-center p-2 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-full mb-6 border border-cyan-500/20">
              <Shield className="w-6 h-6 text-cyan-400 mr-2" />
              <span className="text-cyan-400 font-semibold">LEGENDARY FEATURES</span>
            </div>
            <h2 className="text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-orange-400 bg-clip-text text-transparent">
                Forge Your Legacy
              </span>
            </h2>
            <p className="text-gray-400 text-lg max-w-3xl mx-auto">
              Unlock the power of advanced fantasy gaming with tools designed for champions
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-orange-600/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100" />
              <div className="relative text-center p-8 bg-gradient-to-b from-gray-900/50 to-gray-800/30 backdrop-blur-sm rounded-2xl border border-purple-500/20 hover:border-purple-500/40 transition-all duration-500 transform hover:scale-105">
                <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:rotate-6 transition-transform duration-500">
                  <Zap className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-purple-300 transition-colors">Lightning Analytics</h3>
                <p className="text-gray-400 leading-relaxed">
                  Real-time player insights, performance predictions, and AI-powered recommendations 
                  to dominate every match.
                </p>
              </div>
            </div>
            
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-600/20 to-purple-600/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100" />
              <div className="relative text-center p-8 bg-gradient-to-b from-gray-900/50 to-gray-800/30 backdrop-blur-sm rounded-2xl border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-500 transform hover:scale-105">
                <div className="w-20 h-20 bg-gradient-to-r from-cyan-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:rotate-6 transition-transform duration-500">
                  <Target className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-cyan-300 transition-colors">Precision Tracking</h3>
                <p className="text-gray-400 leading-relaxed">
                  Advanced match tracking with live updates, detailed statistics, and 
                  comprehensive performance analysis.
                </p>
              </div>
            </div>
            
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-600/20 to-cyan-600/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100" />
              <div className="relative text-center p-8 bg-gradient-to-b from-gray-900/50 to-gray-800/30 backdrop-blur-sm rounded-2xl border border-orange-500/20 hover:border-orange-500/40 transition-all duration-500 transform hover:scale-105">
                <div className="w-20 h-20 bg-gradient-to-r from-orange-600 to-cyan-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:rotate-6 transition-transform duration-500">
                  <Trophy className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-orange-300 transition-colors">Instant Rewards</h3>
                <p className="text-gray-400 leading-relaxed">
                  Lightning-fast payouts with secure transactions. Claim your victories 
                  and rewards the moment tournaments conclude.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Live Events Teaser Section */}
      <section className="py-20 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-900/30 via-orange-900/20 to-cyan-900/30 border border-purple-500/30">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.02"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50" />
            
            <div className="relative p-12 text-center">
              <div className="inline-flex items-center justify-center p-3 bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-full mb-6 border border-red-500/30">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse mr-3" />
                <span className="text-red-400 font-bold text-lg">LIVE EVENTS</span>
              </div>
              
              <h2 className="text-4xl md:text-6xl font-bold mb-6">
                <span className="bg-gradient-to-r from-red-400 via-orange-500 to-yellow-400 bg-clip-text text-transparent">
                  Battle Royale
                </span>
                <br />
                <span className="text-white">Starting Soon</span>
              </h2>
              
              <p className="text-gray-300 text-xl mb-8 max-w-2xl mx-auto">
                The ultimate showdown begins in minutes. Join thousands of players 
                in the most intense fantasy tournament of the year.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                <div className="flex items-center space-x-6 text-lg">
                  <div className="flex items-center text-cyan-400">
                    <Users className="w-5 h-5 mr-2" />
                    <span className="font-bold">50K+</span>
                    <span className="text-gray-400 ml-1">Players</span>
                  </div>
                  <div className="flex items-center text-orange-400">
                    <Trophy className="w-5 h-5 mr-2" />
                    <span className="font-bold">$1M</span>
                    <span className="text-gray-400 ml-1">Prize Pool</span>
                  </div>
                </div>
              </div>
              
              <Button 
                size="lg" 
                className="group bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white px-10 py-4 text-xl font-bold rounded-xl shadow-2xl hover:shadow-red-500/25 transition-all duration-300 transform hover:scale-105"
              >
                <Gamepad2 className="w-6 h-6 mr-3 group-hover:rotate-12 transition-transform" />
                Join Battle
                <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section Preview */}
      <section className="py-16 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center justify-center p-2 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 rounded-full mb-6 border border-purple-500/20">
                <Star className="w-5 h-5 text-purple-400 mr-2" />
                <span className="text-purple-400 font-semibold">ABOUT E-CRAZE</span>
              </div>
              
              <h2 className="text-4xl font-bold mb-6">
                <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  Built by Gamers,
                </span>
                <br />
                <span className="text-white">For Gamers</span>
              </h2>
              
              <p className="text-gray-400 text-lg leading-relaxed mb-8">
                E-CRAZE was born from a passion for competitive gaming and the thrill of strategic 
                team building. We've created the ultimate platform where esports meets fantasy sports, 
                giving you the power to manage your dream teams and compete for glory.
              </p>
              
              <Link to="/about">
                <Button 
                  variant="outline" 
                  className="group border-purple-500/50 text-purple-400 hover:bg-purple-500/10 hover:border-purple-500 transition-all duration-300"
                >
                  Learn More
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-cyan-600/20 rounded-3xl blur-2xl" />
              <div className="relative bg-gradient-to-b from-gray-900/50 to-gray-800/30 backdrop-blur-sm rounded-3xl border border-purple-500/20 p-8">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-cyan-400 mb-2">2.5M+</div>
                    <div className="text-gray-400">Active Players</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-orange-400 mb-2">$50M+</div>
                    <div className="text-gray-400">Prizes Awarded</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-400 mb-2">25+</div>
                    <div className="text-gray-400">Games Supported</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-400 mb-2">99.9%</div>
                    <div className="text-gray-400">Uptime</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;