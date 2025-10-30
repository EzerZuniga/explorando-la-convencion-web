import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaMapMarkedAlt, FaImages, FaLightbulb, FaEnvelope, FaInstagram, FaFacebookF, FaTwitter, FaUserCircle } from 'react-icons/fa';



type NavItem = {
  name: string;
  href: string;
  icon: React.ReactNode;
};

const navigation: NavItem[] = [
  { name: 'Inicio', href: '/', icon: <FaHome /> },
  { name: 'Destinos', href: '/destinations', icon: <FaMapMarkedAlt /> },
  { name: 'Galería', href: '/gallery', icon: <FaImages /> },
  { name: 'Tips', href: '/tips', icon: <FaLightbulb /> },
  { name: 'Contacto', href: '/contact', icon: <FaEnvelope /> },
];


const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="w-full sticky top-0 z-50">
      {/* Barra superior informativa */}
      <div className="w-full bg-blue-900 text-white text-xs md:text-sm py-2 px-4 flex flex-col md:flex-row justify-between items-center gap-2 font-semibold shadow border-b border-blue-950 animate-fade-in">
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-2">
            <FaMapMarkedAlt className="inline-block text-blue-200" aria-hidden="true" />
            <span>Av. Jorge Chavez</span>
          </span>
          <span className="hidden sm:flex items-center gap-2">
            <FaLightbulb className="inline-block text-blue-200" aria-hidden="true" />
            <span>Lunes - Viernes 9:00 - 1:00</span>
          </span>
        </div>
        <div className="flex items-center gap-2 md:gap-4">
          <a href="https://instagram.com" target="_blank" rel="noopener" aria-label="Instagram" className="hover:text-blue-300 focus:outline-none focus:ring-2 focus:ring-white transition-colors duration-200">
            <FaInstagram className="text-lg md:text-xl" />
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener" aria-label="Facebook" className="hover:text-blue-300 focus:outline-none focus:ring-2 focus:ring-white transition-colors duration-200">
            <FaFacebookF className="text-lg md:text-xl" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener" aria-label="Twitter" className="hover:text-blue-300 focus:outline-none focus:ring-2 focus:ring-white transition-colors duration-200">
            <FaTwitter className="text-lg md:text-xl" />
          </a>
          <a href="#login" className="ml-2 px-3 py-1 rounded-full bg-blue-700 hover:bg-blue-600 text-white font-bold flex items-center gap-1 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white" aria-label="Iniciar sesión">
            <FaUserCircle className="text-base" />
            <span className="hidden sm:inline">Iniciar sesión</span>
          </a>
        </div>
      </div>
      {/* Navegación principal */}
      <nav className="bg-white/95 backdrop-blur-md shadow-xl border-b border-gray-200" role="navigation" aria-label="Main Navigation">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo y nombre */}
            <div className="flex items-center gap-4">
              <Link to="/" className="flex items-center gap-2 group">
                <div className="bg-white rounded-full shadow-lg p-1 border border-blue-200 transition-transform duration-200 group-hover:scale-105">
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVkuVOTVubZ2tPnUYTjz6GeReN63BQvdb15w&s" alt="Logo IE URIEL GARCIA" className="h-10 w-10 object-contain" />
                </div>
                <span className="text-xl md:text-2xl font-extrabold text-blue-900 tracking-tight group-hover:text-blue-700 transition-colors duration-200">
                  Explorando la Convención
                </span>
              </Link>
            </div>
            {/* Menú principal desktop */}
            <div className="hidden md:flex items-center space-x-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`group flex items-center gap-2 px-4 py-2 rounded-lg text-base font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-700 ${
                    isActive(item.href)
                      ? 'text-blue-700 border-b-2 border-blue-700 bg-blue-50 shadow-sm'
                      : 'text-gray-700 hover:text-blue-700 hover:bg-blue-50'
                  }`}
                  aria-current={isActive(item.href) ? 'page' : undefined}
                >
                  <span className="text-lg transition-transform duration-200 group-hover:scale-110 group-hover:text-blue-700">{item.icon}</span>
                  {item.name}
                </Link>
              ))}
            </div>
            {/* Botón menú móvil */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-lg text-blue-900 hover:text-blue-700 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-700 transition-all duration-200"
                aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
                aria-expanded={isOpen}
              >
                <span className="text-2xl font-bold">{isOpen ? '✕' : '☰'}</span>
              </button>
            </div>
          </div>
        </div>
        {/* Menú móvil */}
        {isOpen && (
          <div className="md:hidden bg-white/98 backdrop-blur-lg border-t border-gray-200 shadow-lg animate-fade-in">
            <div className="px-2 pt-2 pb-3 space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`group flex items-center gap-3 px-4 py-3 rounded-xl text-base font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-700 ${
                    isActive(item.href)
                      ? 'text-blue-700 bg-blue-50 border-l-4 border-blue-700 shadow-sm'
                      : 'text-gray-700 hover:text-blue-700 hover:bg-blue-50'
                  }`}
                  aria-current={isActive(item.href) ? 'page' : undefined}
                  onClick={() => setIsOpen(false)}
                >
                  <span className="text-lg transition-transform duration-200 group-hover:scale-110 group-hover:text-blue-700">{item.icon}</span>
                  {item.name}
                </Link>
              ))}
              <a href="#login" className="mt-2 px-4 py-2 rounded-full bg-blue-700 hover:bg-blue-600 text-white font-bold flex items-center gap-2 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-700 justify-center" aria-label="Iniciar sesión">
                <FaUserCircle className="text-base" />
                <span>Iniciar sesión</span>
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;