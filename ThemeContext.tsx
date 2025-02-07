import { createContext } from 'react';
import { useState } from 'react';
import colours from './constants/styles';

interface ThemeProps {
  children: React.ReactNode;
}

const themes = {
  light: {
    backgroundColor: colours.lightBackground,
    textColor: 'black'
  },
  dark: {
    backgroundColor: colours.darkBackground,
    textColor: 'white'
  },
};

export const ThemeContext = createContext(
  {
    theme: themes.light,
    toggleTheme: () => {}
  }
);

export const ThemeProvider = ({ children }: ThemeProps) => {
  const [theme, setTheme] = useState(themes.light);

  function toggleTheme() {
    setTheme(theme === themes.light ? themes.dark : themes.light);
  }

  return (
    <ThemeContext.Provider value={{theme, toggleTheme}}>
      {children}
    </ThemeContext.Provider>
  )
}
