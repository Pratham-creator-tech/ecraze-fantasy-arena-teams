
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, Trophy, User, LogIn, LogOut } from 'lucide-react';
import WalletModal from './WalletModal';
import AuthModal from './AuthModal';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const location = useLocation();

  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated') === 'true';
    const email = localStorage.getItem('userEmail') || '';
    setIsAuthenticated(authStatus);
    setUserEmail(email);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    setIsAuthenticated(false);
    setUserEmail('');
  };

  const handleAuthSuccess = () => {
    const authStatus = localStorage.getItem('isAuthenticated') === 'true';
    const email = localStorage.getItem('userEmail') || '';
    setIsAuthenticated(authStatus);
    setUserEmail(email);
  };

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/games', label: 'Games' },
    { path: '/tournaments', label: 'Tournaments' },
    { path: '/leaderboard', label: 'Leaderboard' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-black/20 backdrop-blur-md border-b border-purple-500/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 gaming-gradient rounded-lg flex items-center justify-center">
              <Trophy className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              E-CRAZE
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  isActive(item.path)
                    ? 'text-cyan-400 bg-purple-500/20'
                    : 'text-gray-300 hover:text-cyan-400 hover:bg-purple-500/10'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Wallet & Auth Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            {isAuthenticated && <WalletModal />}
            {isAuthenticated ? (
              <>
                <span className="text-sm text-gray-300">Welcome, {userEmail.split('@')[0]}</span>
                <Button variant="ghost" size="sm" onClick={handleLogout} className="text-gray-300 hover:text-cyan-400">
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" size="sm" onClick={() => setIsAuthModalOpen(true)} className="text-gray-300 hover:text-cyan-400">
                  <LogIn className="w-4 h-4 mr-2" />
                  Login
                </Button>
                <Button size="sm" onClick={() => setIsAuthModalOpen(true)} className="gaming-gradient neon-glow">
                  <User className="w-4 h-4 mr-2" />
                  Sign Up
                </Button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-3">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`block px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  isActive(item.path)
                    ? 'text-cyan-400 bg-purple-500/20'
                    : 'text-gray-300 hover:text-cyan-400 hover:bg-purple-500/10'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-3 space-y-2">
              {isAuthenticated ? (
                <Button variant="ghost" size="sm" onClick={handleLogout} className="w-full text-gray-300 hover:text-cyan-400">
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              ) : (
                <>
                  <Button variant="ghost" size="sm" onClick={() => setIsAuthModalOpen(true)} className="w-full text-gray-300 hover:text-cyan-400">
                    <LogIn className="w-4 h-4 mr-2" />
                    Login
                  </Button>
                  <Button size="sm" onClick={() => setIsAuthModalOpen(true)} className="w-full gaming-gradient neon-glow">
                    <User className="w-4 h-4 mr-2" />
                    Sign Up
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
      
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)}
        onAuthSuccess={handleAuthSuccess}
      />
    </nav>
  );
};

export default Navigation;
