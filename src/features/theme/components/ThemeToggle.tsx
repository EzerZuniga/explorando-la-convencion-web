import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/features/theme';

interface ThemeToggleProps {
  scrolled?: boolean;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ scrolled = false }) => {
  const { darkMode, mounted, toggleTheme } = useTheme();

  if (!mounted) {
    return (
      <div className="h-10 w-10 sm:h-9 sm:w-9 rounded-full" />
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className={`h-10 w-10 sm:h-9 sm:w-9 inline-flex items-center justify-center transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/80 focus-visible:ring-offset-2 ${
        scrolled
          ? 'text-brand-text dark:text-white hover:text-brand-primary dark:hover:text-brand-primary/70 focus-visible:ring-offset-white dark:focus-visible:ring-offset-brand-text'
          : 'text-white hover:text-brand-primary/25 focus-visible:ring-offset-transparent'
      }`}
      aria-label={darkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
      title={darkMode ? 'Modo claro' : 'Modo oscuro'}
      aria-pressed={darkMode}
    >
      {darkMode ? (
        <Sun className="w-5 h-5 sm:w-[18px] sm:h-[18px]" strokeWidth={2} />
      ) : (
        <Moon className="w-5 h-5 sm:w-[18px] sm:h-[18px]" strokeWidth={2} />
      )}
    </button>
  );
};

export default ThemeToggle;
