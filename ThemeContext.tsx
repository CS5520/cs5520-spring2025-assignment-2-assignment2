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

interface ThemeProviderProps {
  children: ReactNode;
}

interface Theme {
  backgroundColor: string;
  textColor: string;
}

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType>({
  theme: themes.light,
  toggleTheme: () => {},
});

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
