import React, { createContext, useContext, useEffect, useState } from 'react';
import { soundManager } from '../utils/audio';

type Theme = 'dark' | 'light';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
  soundMuted: boolean;
  toggleSound: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>(() => {
    const saved = localStorage.getItem('sinan_theme');
    if (saved === 'dark' || saved === 'light') return saved;
    return 'dark'; // Default to dark theme for portfolio
  });
  const [soundMuted, setSoundMuted] = useState<boolean>(() => soundManager.getMuted());

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.remove('light');
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
    }
    localStorage.setItem('sinan_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    soundManager.playPop();
    setThemeState((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  const toggleSound = () => {
    const isMuted = soundManager.toggleMute();
    setSoundMuted(isMuted);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme, soundMuted, toggleSound }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

