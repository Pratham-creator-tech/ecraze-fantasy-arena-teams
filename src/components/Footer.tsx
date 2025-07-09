import { Link } from 'react-router-dom';
import { Trophy, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black/40 backdrop-blur-md border-t border-purple-500/20 mt-20">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 gaming-gradient rounded-lg flex items-center justify-center">
                <Trophy className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                E-CRAZE
              </span>
            </Link>
            <p className="text-gray-400 text-sm max-w-xs">
              The ultimate fantasy esports platform. Create teams, join contests, and win amazing prizes.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <div className="space-y-2">
              <Link to="/games" className="block text-gray-400 hover:text-cyan-400 transition-colors">
                Games
              </Link>
              <Link to="/tournaments" className="block text-gray-400 hover:text-cyan-400 transition-colors">
                Tournaments
              </Link>
              <Link to="/leaderboard" className="block text-gray-400 hover:text-cyan-400 transition-colors">
                Leaderboard
              </Link>
              <a href="#" className="block text-gray-400 hover:text-cyan-400 transition-colors">
                How to Play
              </a>
            </div>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Support</h3>
            <div className="space-y-2">
              <a href="#" className="block text-gray-400 hover:text-cyan-400 transition-colors">
                Help Center
              </a>
              <a href="#" className="block text-gray-400 hover:text-cyan-400 transition-colors">
                Contact Us
              </a>
              <a href="#" className="block text-gray-400 hover:text-cyan-400 transition-colors">
                Terms of Service
              </a>
              <a href="#" className="block text-gray-400 hover:text-cyan-400 transition-colors">
                Privacy Policy
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center text-gray-400">
                <Mail className="w-4 h-4 mr-2" />
                <span className="text-sm">support@e-craze.com</span>
              </div>
              <div className="flex items-center text-gray-400">
                <Phone className="w-4 h-4 mr-2" />
                <span className="text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center text-gray-400">
                <MapPin className="w-4 h-4 mr-2" />
                <span className="text-sm">Gaming District, Tech City</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-purple-500/20 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2024 E-CRAZE. All rights reserved. Play responsibly.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;