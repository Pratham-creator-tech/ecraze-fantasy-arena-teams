
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import GameCard from '@/components/GameCard';
import { Button } from '@/components/ui/button';
import { ArrowRight, Star, Zap } from 'lucide-react';
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
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      
      {/* Featured Games Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                Featured Tournaments
              </span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Join the biggest tournaments with massive prize pools and compete against the best players worldwide.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredGames.map((game) => (
              <GameCard key={game.id} {...game} />
            ))}
          </div>
          
          <div className="text-center">
            <Link to="/games">
              <Button size="lg" variant="outline" className="border-purple-500/50 hover:bg-purple-500/10">
                View All Games
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 px-4 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-pink-400 to-cyan-500 bg-clip-text text-transparent">
                Why Choose E-CRAZE?
              </span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 game-card rounded-xl">
              <div className="w-16 h-16 gaming-gradient rounded-full flex items-center justify-center mx-auto mb-6">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-white">Real-Time Updates</h3>
              <p className="text-gray-400">
                Get live updates on player performances, match results, and your fantasy team scores as events unfold.
              </p>
            </div>
            
            <div className="text-center p-8 game-card rounded-xl">
              <div className="w-16 h-16 gaming-gradient rounded-full flex items-center justify-center mx-auto mb-6">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-white">Smart Analytics</h3>
              <p className="text-gray-400">
                Advanced player statistics, performance predictions, and strategic insights to help you build winning teams.
              </p>
            </div>
            
            <div className="text-center p-8 game-card rounded-xl">
              <div className="w-16 h-16 gaming-gradient rounded-full flex items-center justify-center mx-auto mb-6">
                <ArrowRight className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-white">Instant Payouts</h3>
              <p className="text-gray-400">
                Fast and secure prize distribution with multiple payout options. Get your winnings instantly after tournaments end.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
