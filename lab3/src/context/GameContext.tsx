import React, { createContext, useState, useContext } from 'react';

interface GameStats {
  score: number;
  taps: number;
  doubleTaps: number;
  longPresses: number;
  drags: number;
  swipesRight: number;
  swipesLeft: number;
  pinches: number;
}

interface GameContextType {
  stats: GameStats;
  updateStat: (stat: keyof GameStats, value: number) => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const defaultStats: GameStats = {
  score: 0, taps: 0, doubleTaps: 0, longPresses: 0, drags: 0, swipesRight: 0, swipesLeft: 0, pinches: 0
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider = ({ children }: { children: React.ReactNode }) => {
  const [stats, setStats] = useState<GameStats>(defaultStats);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const updateStat = (stat: keyof GameStats, value: number) => {
    setStats(prev => ({ ...prev, [stat]: prev[stat] + value }));
  };

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

  return (
    <GameContext.Provider value={{ stats, updateStat, theme, toggleTheme }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) throw new Error('useGame must be used within GameProvider');
  return context;
};