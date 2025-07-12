import { Trophy, Gamepad2, Users, TrendingUp, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="relative overflow-hidden">
      <div className="relative z-10 bg-[hsl(var(--card)/0.95)] backdrop-blur-md border-t border-[hsl(var(--border))]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Brand Section */}
            <div className="lg:col-span-1">
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #c471f5 0%, #fa71cd 100%)' }}>
                  <Trophy className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-extrabold bg-gradient-to-r from-[#29d8f5] via-[#5f8fff] to-[#a084ee] bg-clip-text text-transparent tracking-tight" style={{ letterSpacing: '0.01em' }}>
                  E-CRAZE
                </span>
              </div>
              <p className="text-[hsl(var(--muted-foreground))] text-base leading-relaxed mb-8 font-medium">
                The ultimate fantasy esports platform where champions are forged and legends never die. <br />
                Join millions of players in the most immersive gaming experience.
              </p>
              <div className="flex space-x-4 mt-2">
                <a href="#" className="w-10 h-10 bg-gradient-to-r from-[hsl(var(--primary)/0.1)] to-[hsl(var(--secondary)/0.1)] rounded-lg flex items-center justify-center text-[hsl(var(--primary))] hover:from-[hsl(var(--primary))] hover:to-[hsl(var(--secondary))] hover:text-white transition-all duration-300 shadow-sm">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-gradient-to-r from-[hsl(var(--primary)/0.1)] to-[hsl(var(--secondary)/0.1)] rounded-lg flex items-center justify-center text-[hsl(var(--primary))] hover:from-[hsl(var(--primary))] hover:to-[hsl(var(--secondary))] hover:text-white transition-all duration-300 shadow-sm">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-gradient-to-r from-[hsl(var(--primary)/0.1)] to-[hsl(var(--secondary)/0.1)] rounded-lg flex items-center justify-center text-[hsl(var(--primary))] hover:from-[hsl(var(--primary))] hover:to-[hsl(var(--secondary))] hover:text-white transition-all duration-300 shadow-sm">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-gradient-to-r from-[hsl(var(--primary)/0.1)] to-[hsl(var(--secondary)/0.1)] rounded-lg flex items-center justify-center text-[hsl(var(--primary))] hover:from-[hsl(var(--primary))] hover:to-[hsl(var(--secondary))] hover:text-white transition-all duration-300 shadow-sm">
                  <Youtube className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-bold text-[hsl(var(--foreground))] mb-6 tracking-tight">Quick Links</h3>
              <ul className="space-y-4 text-base font-medium">
                <li>
                  <Link to="/games" className="flex items-center gap-2 text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors">
                    <Gamepad2 className="w-4 h-4" /> Games
                  </Link>
                </li>
                <li>
                  <Link to="/tournaments" className="flex items-center gap-2 text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors">
                    <Trophy className="w-4 h-4" /> Tournaments
                  </Link>
                </li>
                <li>
                  <Link to="/leaderboard" className="flex items-center gap-2 text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors">
                    <TrendingUp className="w-4 h-4" /> Leaderboard
                  </Link>
                </li>
                <li>
                  <Link to="/fantasy-team" className="flex items-center gap-2 text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors">
                    <Users className="w-4 h-4" /> Fantasy Team
                  </Link>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="text-lg font-bold text-[hsl(var(--foreground))] mb-6 tracking-tight">Support</h3>
              <ul className="space-y-4 text-base font-medium">
                <li className="flex items-center gap-2 text-[hsl(var(--muted-foreground))]">
                  <Mail className="w-4 h-4" /> <span className="font-semibold">support@ecraze.com</span>
                </li>
                <li className="flex items-center gap-2 text-[hsl(var(--muted-foreground))]">
                  <Phone className="w-4 h-4" /> <span>+1 (555) 123-4567</span>
                </li>
                <li className="flex items-center gap-2 text-[hsl(var(--muted-foreground))]">
                  <MapPin className="w-4 h-4" /> <span>Gaming District, E-Sports City</span>
                </li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h3 className="text-lg font-bold text-[hsl(var(--foreground))] mb-6 tracking-tight">Stay Updated</h3>
              <p className="text-[hsl(var(--muted-foreground))] text-base mb-4 font-medium">
                Get the latest updates on tournaments, new games, and exclusive rewards.
              </p>
              <div className="flex mt-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 border border-[hsl(var(--border))] rounded-l-lg focus:outline-none focus:border-[hsl(var(--primary))] bg-[hsl(var(--card))] text-[hsl(var(--foreground))] text-base"
                />
                <button className="px-4 py-2 bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--secondary))] text-white rounded-r-lg font-semibold hover:from-[hsl(var(--secondary))] hover:to-[hsl(var(--primary))] transition-all duration-300 shadow-sm text-base">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="mt-12 pt-8 border-t border-[hsl(var(--border))] flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[hsl(var(--muted-foreground))] text-base font-medium">
              © 2024 <span className="font-bold">E-CRAZE</span>. All rights reserved. The ultimate fantasy esports platform.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] text-base font-medium transition-colors">Privacy Policy</a>
              <a href="#" className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] text-base font-medium transition-colors">Terms of Service</a>
              <a href="#" className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] text-base font-medium transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;