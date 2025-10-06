import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export default function Navbar({ currentPage, onNavigate }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isNonHome = currentPage !== 'home';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', id: 'home' },
    { name: 'Portfolio', id: 'portfolio' },
    { name: 'Services', id: 'services' },
    { name: 'About', id: 'about' },
    { name: 'Reservation', id: 'reservation' }
  ];

  const handleNavClick = (pageId: string) => {
    onNavigate(pageId);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-500 ${
        currentPage === 'home'
          ? isScrolled
            ? 'bg-black/95 backdrop-blur-sm md:py-4 py-3 shadow-lg'
            : 'md:bg-transparent bg-black/90 md:py-6 py-3'
          : 'bg-white md:py-4 py-3 shadow-md border-b border-gray-200'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex items-center justify-between">
          <a
            href="#home"
            onClick={(e) => { e.preventDefault(); handleNavClick('home'); }}
            className={`text-lg sm:text-xl md:text-2xl font-light tracking-widest transition-colors duration-300 ${
              isNonHome ? 'text-gray-900 hover:text-amber-600' : 'text-white hover:text-amber-400'
            }`}
          >
            LUXE INTERIORS
          </a>

          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => { e.preventDefault(); handleNavClick(item.id); }}
                className={`text-sm font-light tracking-wider transition-all duration-300 relative group ${
                  currentPage === item.id
                    ? isNonHome
                      ? 'text-amber-700'
                      : 'text-amber-400'
                    : isNonHome
                      ? 'text-gray-900 hover:text-amber-700'
                      : 'text-gray-200 hover:text-amber-400'
                }`}
              >
                {item.name}
                <span
                  className={`absolute -bottom-1 left-0 h-px bg-amber-400 transition-all duration-300 ${
                    currentPage === item.id ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                ></span>
              </a>
            ))}
          </div>

          <button
            className={`md:hidden transition-colors duration-300 ${
              isNonHome ? 'text-gray-900' : 'text-white'
            }`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className={`md:hidden absolute top-full left-0 w-full ${
          isNonHome ? 'bg-white shadow-lg border-b border-gray-200' : 'bg-black/98 backdrop-blur-sm'
        }`}>
          <div className="flex flex-col items-center py-8 space-y-6">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => { e.preventDefault(); handleNavClick(item.id); }}
                className={`text-lg font-light tracking-wider transition-colors duration-300 ${
                  currentPage === item.id
                    ? isNonHome
                      ? 'text-amber-700'
                      : 'text-amber-400'
                    : isNonHome
                      ? 'text-gray-900 hover:text-amber-700'
                      : 'text-gray-200 hover:text-amber-400'
                }`}
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
