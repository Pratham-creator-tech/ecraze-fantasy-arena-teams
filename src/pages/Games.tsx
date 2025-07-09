
import Navigation from '@/components/Navigation';
import GameCard from '@/components/GameCard';
import Footer from '@/components/Footer';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Filter } from 'lucide-react';
import { useState } from 'react';

const Games = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const games = [
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
    },
    {
      id: 'pubg',
      title: 'PUBG Global Championship',
      image: 'https://images.unsplash.com/photo-1560419015-7c427e8ae5ba?w=400&h=300&fit=crop',
      players: '2.5M',
      timeLeft: '1d 8h',
      prizePool: '$500,000',
      category: 'Battle Royale'
    },
    {
      id: 'bgmi',
      title: 'BGMI Pro League',
      image: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=400&h=300&fit=crop',
      players: '3.2M',
      timeLeft: '3d 6h',
      prizePool: '$200,000',
      category: 'Battle Royale'
    },
    {
      id: 'dota2',
      title: 'Dota 2 The International',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop',
      players: '1.8M',
      timeLeft: '3d 12h',
      prizePool: '$300,000',
      category: 'MOBA'
    },
    {
      id: 'apex',
      title: 'Apex Legends Global Series',
      image: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=400&h=300&fit=crop',
      players: '750K',
      timeLeft: '6d 4h',
      prizePool: '$80,000',
      category: 'Battle Royale'
    },
    {
      id: 'rocket-league',
      title: 'Rocket League Championship Series',
      image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=300&fit=crop',
      players: '600K',
      timeLeft: '4d 18h',
      prizePool: '$120,000',
      category: 'Sports'
    },
    {
      id: 'fortnite',
      title: 'Fortnite Championship Series',
      image: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=400&h=300&fit=crop',
      players: '1.5M',
      timeLeft: '5d 2h',
      prizePool: '$350,000',
      category: 'Battle Royale'
    }
  ];

  const categories = ['All', 'FPS', 'MOBA', 'Battle Royale', 'Sports'];

  const filteredGames = games.filter(game => {
    const matchesSearch = game.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || game.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Fantasy Games
            </span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Choose from our extensive collection of esports games and create your ultimate fantasy teams.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Search games..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-black/20 border-purple-500/20 focus:border-purple-500/50"
            />
          </div>
          
          <div className="flex gap-2 flex-wrap">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className={selectedCategory === category 
                  ? "gaming-gradient" 
                  : "border-purple-500/20 hover:bg-purple-500/10"
                }
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Games Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredGames.map((game) => (
            <GameCard key={game.id} {...game} />
          ))}
        </div>

        {filteredGames.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-400 text-lg">
              No games found matching your criteria.
            </p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Games;
