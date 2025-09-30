import React, { useState } from 'react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-green-700 fixed top-0 left-0 right-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="text-white font-extrabold text-xl tracking-tight">
            AgriMitra
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <a 
              href="#home" 
              className="text-white hover:text-green-300 font-medium transition-colors"
            >
              Home
            </a>
            <a 
              href="#dashboard" 
              className="text-white hover:text-green-300 font-medium transition-colors"
            >
              Dashboard
            </a>
            <div className="relative group">
              <button className="text-white hover:text-green-300 font-medium transition-colors flex items-center gap-1">
                Platform
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="py-1">
                  <a href="#how-built" className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700">
                    How Platform is Built
                  </a>
                  <a href="#how-works" className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700">
                    How It Works
                  </a>
                </div>
              </div>
            </div>
            <a 
              href="#signin" 
              className="text-white hover:text-green-300 font-medium transition-colors"
            >
              Sign In
            </a>
            <button className="bg-green-600 hover:bg-green-500 text-white font-medium px-4 py-2 rounded-lg transition-colors">
              Get Started
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={toggleMenu}
            className="md:hidden p-2 rounded hover:bg-green-600 transition-colors"
          >
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-3 pb-3 border-t border-green-600 pt-3">
            <div className="space-y-2">
              <a 
                href="#home" 
                className="block text-white hover:text-green-300 font-medium py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </a>
              <a 
                href="#dashboard" 
                className="block text-white hover:text-green-300 font-medium py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </a>
              <a 
                href="#how-built" 
                className="block text-white hover:text-green-300 font-medium py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                How Platform is Built
              </a>
              <a 
                href="#how-works" 
                className="block text-white hover:text-green-300 font-medium py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                How It Works
              </a>
              <a 
                href="#signin" 
                className="block text-white hover:text-green-300 font-medium py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign In
              </a>
              <button 
                className="w-full bg-green-600 hover:bg-green-500 text-white font-medium px-4 py-2 rounded-lg transition-colors mt-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Get Started
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
