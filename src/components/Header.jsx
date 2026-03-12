import { useState, useEffect } from 'react';
import { Menu, X, UserCog } from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Oila uchun', href: '#' },
    { name: 'Qizlar uchun', href: '#' },
    { name: "O'g'il bolalar uchun", href: '#' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-100'
          : 'bg-white'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center cursor-pointer">
            <div className="flex flex-col items-start leading-none gap-0.5">
              <span className="text-3xl font-black text-indigo-900 tracking-tight">
                SP
              </span>
              <span className="text-[11px] font-medium text-gray-500 tracking-wider pl-0.5">
                Search.Place
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors duration-200"
              >
                {link.name}
              </a>
            ))}
            
            {/* CTA Button */}
            <a
              href="#"
              className="inline-flex items-center justify-center px-6 py-2.5 border border-transparent text-sm font-medium rounded-full text-white bg-indigo-600 hover:bg-indigo-700 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
            >
              E'lon berish
            </a>
          </nav>

          {/* Admin Access & Mobile Toggle */}
          <div className="flex items-center space-x-4">
            {/* Subtle Admin Link */}
            <a
              href="#"
              className="hidden sm:flex items-center text-xs text-gray-400 hover:text-gray-600 transition-colors duration-200"
              title="Admin Panel"
            >
              <UserCog className="w-4 h-4 mr-1" />
              <span className="sr-only lg:not-sr-only">Admin Panel</span>
            </a>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 transition-colors focus:outline-none"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute w-full bg-white border-b border-gray-100 shadow-lg transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? 'max-h-96 opacity-100 visible' : 'max-h-0 opacity-0 invisible'
        } overflow-hidden`}
      >
        <div className="px-4 pt-2 pb-6 space-y-1">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="block px-3 py-3 text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
            >
              {link.name}
            </a>
          ))}
          <div className="pt-4 mt-2 border-t border-gray-100">
            <a
              href="#"
              className="flex justify-center w-full px-5 py-3 text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 shadow-md rounded-xl transition-all active:scale-95"
            >
              E'lon berish
            </a>
          </div>
          <div className="pt-4 mt-4 flex justify-center">
             <a
              href="#"
              className="flex items-center text-sm text-gray-500 hover:text-indigo-600 transition-colors"
            >
              <UserCog className="w-4 h-4 mr-2" />
              Admin Panel
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
