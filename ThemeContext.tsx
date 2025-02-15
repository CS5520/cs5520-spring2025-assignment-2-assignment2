import { createContext, useState, ReactNode } from 'react';

const themes = {
  light: {
    backgroundColor: 'gainsboro',
    textColor: 'black',
  },
  dark: {
    backgroundColor: 'black',
    textColor: 'white',
  },
};

interface ThemeContextType {
  theme: typeof themes.light;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType>({
  theme: themes.light,
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children }:{ children: ReactNode } ) => {
  const [theme, setTheme] = useState(themes.light);

  const toggleTheme = () => {
    setTheme(theme === themes.light ? themes.dark : themes.light);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

