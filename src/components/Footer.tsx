
import React from 'react';
import { Link } from 'react-router-dom';


const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-t from-gray-900 via-gray-800 to-gray-700 text-white shadow-inner">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2 flex flex-col justify-center">
            <Link to="/" className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-2 hover:text-blue-300 transition-colors">
              <span role="img" aria-label="logo">🌍</span> Explorando
            </Link>
            <p className="mt-4 text-gray-300 max-w-md text-base leading-relaxed">
              Descubre el mundo a través de nuestras historias de viaje. Compartimos experiencias, consejos y destinos increíbles para inspirar tu próxima aventura.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-blue-200">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-blue-300 transition-colors">Inicio</Link></li>
              <li><Link to="/destinations" className="text-gray-300 hover:text-blue-300 transition-colors">Destinos</Link></li>
              <li><Link to="/gallery" className="text-gray-300 hover:text-blue-300 transition-colors">Galería</Link></li>
              <li><Link to="/tips" className="text-gray-300 hover:text-blue-300 transition-colors">Consejos</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-blue-200">Contacto</h3>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-center gap-2">
                <span className="inline-block">
                  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24" className="text-blue-300"><path d="M21 4H3a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1zm-1.4 2-7.6 6.01L4.4 6h15.2zM4 18V7.24l7.29 5.76a1 1 0 0 0 1.42 0L20 7.24V18H4z"/></svg>
                </span>
                info@explorando.com
              </li>
              <li className="flex items-center gap-2">
                <span className="inline-block">
                  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24" className="text-blue-300"><path d="M17.707 12.293a1 1 0 0 0-1.414 0l-2.293 2.293a8.001 8.001 0 0 1-6.586-6.586l2.293-2.293a1 1 0 0 0 0-1.414L6.293 2.293a1 1 0 0 0-1.414 0l-2 2A2 2 0 0 0 2 6c0 8.837 7.163 16 16 16a2 2 0 0 0 1.707-.879l2-2a1 1 0 0 0 0-1.414l-3.293-3.293z"/></svg>
                </span>
                +1 (555) 123-4567
              </li>
              <li className="flex items-center gap-2">
                <span className="inline-block">
                  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24" className="text-blue-300"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z"/></svg>
                </span>
                Ciudad, País
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-10 pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm text-center md:text-left">
            © 2024 Explorando la Convención. Todos los derechos reservados.
          </p>
          <div className="flex space-x-4">
            <a href="https://facebook.com" target="_blank" rel="noopener" className="group rounded-full bg-gray-800 p-2 hover:bg-blue-600 transition-colors" aria-label="Facebook">
              <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24" className="text-gray-300 group-hover:text-white"><path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.326 24h11.495v-9.294H9.691v-3.622h3.13V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.405 24 24 23.408 24 22.674V1.326C24 .592 23.405 0 22.675 0"/></svg>
            </a>
            <a href="https://instagram.com/ezerzuniga" target="_blank" rel="noopener" className="group rounded-full bg-gray-800 p-2 hover:bg-pink-500 transition-colors" aria-label="Instagram">
              <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24" className="text-gray-300 group-hover:text-white"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.974.974 1.246 2.241 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.974.974-2.241 1.246-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.974-.974-1.246-2.241-1.308-3.608C2.175 15.647 2.163 15.267 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608.974-.974 2.241-1.246 3.608-1.308C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.332.013 7.052.072 5.771.131 4.659.363 3.678 1.344c-.981.981-1.213 2.093-1.272 3.374C2.013 8.332 2 8.741 2 12c0 3.259.013 3.668.072 4.948.059 1.281.291 2.393 1.272 3.374.981.981 2.093 1.213 3.374 1.272C8.332 23.987 8.741 24 12 24c3.259 0 3.668-.013 4.948-.072 1.281-.059 2.393-.291 3.374-1.272.981-.981 1.213-2.093 1.272-3.374.059-1.28.072-1.689.072-4.948 0-3.259-.013-3.668-.072-4.948-.059-1.281-.291-2.393-1.272-3.374-.981-.981-2.093-1.213-3.374-1.272C15.668.013 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener" className="group rounded-full bg-gray-800 p-2 hover:bg-blue-400 transition-colors" aria-label="Twitter">
              <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24" className="text-gray-300 group-hover:text-white"><path d="M24 4.557a9.93 9.93 0 0 1-2.828.775 4.932 4.932 0 0 0 2.165-2.724c-.951.555-2.005.959-3.127 1.184A4.916 4.916 0 0 0 16.616 3c-2.717 0-4.92 2.206-4.92 4.917 0 .386.044.762.127 1.124C7.691 8.816 4.066 6.864 1.64 3.94c-.423.722-.666 1.561-.666 2.475 0 1.708.87 3.216 2.188 4.099a4.904 4.904 0 0 1-2.229-.616c-.054 2.281 1.581 4.415 3.949 4.89a4.936 4.936 0 0 1-2.224.084c.627 1.956 2.444 3.377 4.6 3.418A9.867 9.867 0 0 1 0 21.543a13.94 13.94 0 0 0 7.548 2.212c9.058 0 14.009-7.513 14.009-14.009 0-.213-.005-.425-.014-.636A10.025 10.025 0 0 0 24 4.557z"/></svg>
            </a>
          </div>
        </div>
        <div className="mt-6 text-center">
          <a
            href="https://instagram.com/ezerzuniga"
            target="_blank"
            rel="noopener"
            className="inline-block text-sm text-pink-400 hover:text-pink-600 font-semibold transition-colors underline"
          >
            Desarrollado por Ezer Zuniga
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;