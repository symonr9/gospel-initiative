import React, { createContext, useContext } from 'react';
import { useColorScheme } from '@/hooks/useColorScheme';

const ColorSchemeContext = createContext<'light' | 'dark'>('light');

export const ColorSchemeProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const colorScheme = useColorScheme() || 'light';
  return (
    <ColorSchemeContext.Provider value={colorScheme}>
      {children}
    </ColorSchemeContext.Provider>
  );
};

export const useAppColorScheme = () => useContext(ColorSchemeContext);