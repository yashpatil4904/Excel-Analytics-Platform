import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, BarChart2 } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import Button from './Button';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <nav 
      className={`fixed w-full z-30 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white shadow-md py-2' 
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <BarChart2 className="w-8 h-8 text-primary-600" />
            <span className="text-xl font-semibold text-slate-900">DataViz</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-slate-700 hover:text-primary-600 transition-colors">
              Home
            </Link>
            <Link to="/#features" className="text-slate-700 hover:text-primary-600 transition-colors">
              Features
            </Link>
            <Link to="/#pricing" className="text-slate-700 hover:text-primary-600 transition-colors">
              Pricing
            </Link>
            
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Link to="/dashboard">
                  <Button variant="secondary" size="sm">Dashboard</Button>
                </Link>
                <Button variant="outline" size="sm" onClick={logout}>
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login">
                  <Button variant="outline" size="sm">Log in</Button>
                </Link>
                <Link to="/register">
                  <Button variant="primary" size="sm">Sign up</Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              type="button" 
              onClick={toggleMenu}
              className="text-slate-700 hover:text-slate-900 focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg mt-2 py-4 px-4 absolute w-full">
          <div className="flex flex-col space-y-4">
            <Link to="/" className="px-3 py-2 text-slate-700 hover:text-primary-600 hover:bg-slate-50 rounded-md">
              Home
            </Link>
            <Link to="/#features" className="px-3 py-2 text-slate-700 hover:text-primary-600 hover:bg-slate-50 rounded-md">
              Features
            </Link>
            <Link to="/#pricing" className="px-3 py-2 text-slate-700 hover:text-primary-600 hover:bg-slate-50 rounded-md">
              Pricing
            </Link>
            
            <div className="pt-2 border-t border-slate-200">
              {isAuthenticated ? (
                <>
                  <Link to="/dashboard" className="block w-full py-2">
                    <Button variant="secondary" size="sm" fullWidth>Dashboard</Button>
                  </Link>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={logout} 
                    fullWidth
                    className="mt-2"
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/login" className="block w-full py-2">
                    <Button variant="outline" size="sm" fullWidth>Log in</Button>
                  </Link>
                  <Link to="/register" className="block w-full py-2">
                    <Button variant="primary" size="sm" fullWidth>Sign up</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar; 