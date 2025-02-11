import { createContext, ReactNode, useState } from "react";

const themes = {
  light: {
    backgroundColor: "lightgray",
    textColor: "black",
  },
  dark: {
    backgroundColor: "black",
    textColor: "white",
  },
};

// Interface for ThemeProvider props
interface ThemeProviderProps {
  children: ReactNode;
}

// Interface for Theme object
interface Theme {
  backgroundColor: string;
  textColor: string;
}

// Interface for ThemeContext type
interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

// Create the ThemeContext with default values
export const ThemeContext = createContext<ThemeContextType>({
  theme: themes.light,
  toggleTheme: () => {},
});

/**
 * ThemeProvider Component
 * Provides theme context to its children and manages theme state
 */
export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState<Theme>(themes.light);
  const toggleTheme = () => {
    setTheme((currentTheme) =>
      currentTheme === themes.light ? themes.dark : themes.light
    );
  };
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
