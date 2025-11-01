import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { User, Menu, X, MapPin, Clock, Mail } from 'lucide-react';
import { FaFacebookF, FaInstagram, FaYoutube } from 'react-icons/fa';
import ThemeToggle from './ThemeToggle';

type NavItem = {
  name: string;
  href: string;
};

const navigation: NavItem[] = [
  { name: 'Inicio', href: '/' },
  { name: 'Sobre Nosotros', href: '/about' },
  { name: 'Destinos', href: '/destinations' },
  { name: 'Gastronomía', href: '/gastronomia' },
  { name: 'Blog', href: '/blog' },
  { name: 'Galería', href: '/gallery' },
  { name: 'Tips', href: '/tips' },
  { name: 'Contacto', href: '/contact' },
];

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="w-full fixed top-0 z-50 transition-all duration-300">
      {/* Top bar profesional - desaparece al hacer scroll */}
      <div 
        className={`w-full bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700 transition-all duration-300 overflow-hidden ${
          scrolled ? 'h-0 opacity-0' : 'h-auto py-2.5 opacity-100'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
            
            {/* Información de contacto */}
            <div className="flex items-center gap-4 sm:gap-6 text-xs sm:text-sm">
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                <MapPin size={14} className="flex-shrink-0" />
                <span className="hidden sm:inline">La Convención, Cusco</span>
                <span className="sm:hidden">Cusco</span>
              </div>
              
              <div className="hidden md:flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                <Clock size={14} className="flex-shrink-0" />
                <span>Lun - Dom: 7:00 - 19:00</span>
              </div>
              
              <a 
                href="mailto:info@explorandolaconvencion.pe" 
                className="hidden lg:flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
              >
                <Mail size={14} className="flex-shrink-0" />
                <span>info@explorandolaconvencion.pe</span>
              </a>
            </div>
            
            {/* Redes sociales y mensaje */}
            <div className="flex items-center gap-4">
              <span className="hidden sm:inline text-sm font-medium text-gray-500 dark:text-gray-400">Síguenos:</span>
              
              <div className="flex items-center gap-2">
                <a 
                  href="https://facebook.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-7 h-7 rounded-full bg-gray-100 dark:bg-slate-700 hover:bg-emerald-600 dark:hover:bg-emerald-600 flex items-center justify-center transition-all duration-200 hover:scale-110"
                  aria-label="Facebook"
                  title="Síguenos en Facebook"
                >
                  <FaFacebookF className="text-sm text-gray-700 dark:text-white hover:text-white" />
                </a>
                
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-7 h-7 rounded-full bg-gray-100 dark:bg-slate-700 hover:bg-gradient-to-tr hover:from-purple-600 hover:to-pink-600 flex items-center justify-center transition-all duration-200 hover:scale-110"
                  aria-label="Instagram"
                  title="Síguenos en Instagram"
                >
                  <FaInstagram className="text-sm text-gray-700 dark:text-white hover:text-white" />
                </a>
                
                <a 
                  href="https://youtube.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-7 h-7 rounded-full bg-gray-100 dark:bg-slate-700 hover:bg-red-600 dark:hover:bg-red-600 flex items-center justify-center transition-all duration-200 hover:scale-110"
                  aria-label="YouTube"
                  title="Síguenos en YouTube"
                >
                  <FaYoutube className="text-sm text-gray-700 dark:text-white hover:text-white" />
                </a>
              </div>
            </div>
            
          </div>
        </div>
      </div>
      
      {/* Navegación principal - transparente inicialmente, blanca al hacer scroll */}
      <nav 
        className={`${
          scrolled ? 'bg-white dark:bg-slate-900 shadow-lg' : 'bg-transparent'
        } transition-all duration-300`} 
        role="navigation" 
        aria-label="Navegación principal"
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="flex justify-between h-14 sm:h-16 items-center gap-2 sm:gap-4">
            {/* Logo */}
            <div className="flex items-center flex-shrink-0">
              <Link to="/" className="flex items-center group">
                <img 
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVkuVOTVubZ2tPnUYTjz6GeReN63BQvdb15w&s" 
                  alt="Logo Explorando La Convención" 
                  className={`h-10 w-10 sm:h-12 sm:w-12 object-contain transition-all duration-200 group-hover:scale-110 ${
                    scrolled ? 'brightness-100' : 'brightness-0 invert'
                  }`}
                />
              </Link>
            </div>
            
            {/* Menú principal desktop */}
            <div className="hidden lg:flex items-center space-x-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`px-4 py-2 text-base font-medium transition-colors duration-200 ${
                    scrolled 
                      ? 'text-slate-700 dark:text-gray-200 hover:text-emerald-600 dark:hover:text-emerald-400'
                      : 'text-white hover:text-emerald-300'
                  }`}
                  aria-current={isActive(item.href) ? 'page' : undefined}
                >
                  {item.name}
                </Link>
              ))}
              
              {/* Controles de usuario - Desktop */}
              <div className="flex items-center gap-3 ml-4">
                <ThemeToggle scrolled={scrolled} />
                <button 
                  className={`p-2 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 ${
                    scrolled 
                      ? 'bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-white' 
                      : 'bg-slate-700 hover:bg-slate-600 text-white'
                  }`} 
                  aria-label="Iniciar sesión"
                  title="Iniciar sesión"
                >
                  <User className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            {/* Controles móvil */}
            <div className="lg:hidden flex items-center gap-2">
              <ThemeToggle scrolled={scrolled} />
              <button 
                className={`p-2 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 ${
                  scrolled 
                    ? 'bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-white' 
                    : 'bg-slate-700 hover:bg-slate-600 text-white'
                }`} 
                aria-label="Iniciar sesión"
                title="Iniciar sesión"
              >
                <User className="w-5 h-5" />
              </button>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className={`inline-flex items-center justify-center p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-all duration-200 ${
                  scrolled 
                    ? 'text-slate-800 dark:text-gray-200 hover:bg-slate-200 dark:hover:bg-slate-700' 
                    : 'text-white hover:bg-slate-700'
                }`}
                aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
                aria-expanded={isOpen}
              >
                {isOpen ? (
                  <X className="w-6 h-6" strokeWidth={2.5} />
                ) : (
                  <Menu className="w-6 h-6" strokeWidth={2.5} />
                )}
              </button>
            </div>
          </div>
        </div>
        
        {/* Menú móvil */}
        {isOpen && (
          <div className={`lg:hidden shadow-lg ${
            scrolled 
              ? 'bg-white dark:bg-slate-900 border-t border-gray-200 dark:border-slate-700' 
              : 'bg-slate-700 dark:bg-slate-800 border-t border-slate-600 dark:border-slate-700'
          }`}>
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`block px-4 py-3 text-base font-medium transition-colors duration-200 ${
                    scrolled
                      ? 'text-slate-700 dark:text-gray-200 hover:text-emerald-600 dark:hover:text-emerald-400'
                      : 'text-white hover:text-emerald-300'
                  }`}
                  aria-current={isActive(item.href) ? 'page' : undefined}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;