import React, { createContext, useState } from 'react';

const themes = {
  light: {
    backgroundColor: 'white',
    textColor: 'black'
  },
  dark: {
    backgroundColor: 'black',
    textColor: 'white'
  },
};

interface ThemeContextType {
  theme: {
    backgroundColor: string;
    textColor: string;
  };
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType>({
  theme: themes.light,
  toggleTheme: () => { },
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const theme = isDark ? themes.dark : themes.light;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};