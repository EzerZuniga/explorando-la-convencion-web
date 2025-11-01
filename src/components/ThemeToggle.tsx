import React, { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
  scrolled?: boolean;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ scrolled = false }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Evitar hidratación incorrecta en SSR
  useEffect(() => {
    setMounted(true);
    
    // Verificar preferencia guardada o preferencia del sistema
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    const isDark = savedTheme === 'dark' || (!savedTheme && prefersDark);
    setDarkMode(isDark);
    
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    
    // Guardar preferencia
    localStorage.setItem('theme', newDarkMode ? 'dark' : 'light');
    
    // Aplicar clase al documento
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  // No renderizar hasta que esté montado (evita flash de contenido)
  if (!mounted) {
    return (
      <div className={`p-2 w-9 h-9 rounded-full animate-pulse ${
        scrolled 
          ? 'bg-slate-200' 
          : 'bg-slate-700'
      }`} />
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className={`p-2 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 ${
        scrolled 
          ? 'bg-slate-200 hover:bg-slate-300 text-slate-800' 
          : 'bg-slate-700 hover:bg-slate-600 text-white'
      }`}
      aria-label={darkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
      title={darkMode ? 'Modo claro' : 'Modo oscuro'}
    >
      {darkMode ? (
        <Sun className="w-5 h-5" strokeWidth={2} />
      ) : (
        <Moon className="w-5 h-5" strokeWidth={2} />
      )}
    </button>
  );
};

export default ThemeToggle;