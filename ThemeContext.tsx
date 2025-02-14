import React, { createContext, useState, useContext } from "react";

export interface Theme {
  background: string;
  text: string;
  cardBackground: string;
  cardText: string;
  dateBackground: string;
  dateText: string;
  numericBackground: string;
  numericText: string;
  navBarBackground: string;
  navBarText: string;
}

const darkTheme: Theme = {
  background: "#121212",      
  text: "#FFFFFF",

  cardBackground: "#2F2F2F",
  cardText: "#FFFFFF",

  dateBackground: "#3A3A3C",
  dateText: "#FFFFFF",
  
  numericBackground: "#FFFFFF",
  numericText: "#000000",
  
  navBarBackground: "#1F1F1F",
  navBarText: "#FFFFFF",
};

const lightTheme: Theme = {
  background: "#F0F0F0",
  text: "#000000",
  cardBackground: "#FFFFFF",
  cardText: "#000000",
  dateBackground: "#E5E5E5",
  dateText: "#000000",
  numericBackground: "#FFFFFF",
  numericText: "#000000",
  navBarBackground: "#ECECEC",
  navBarText: "#007BFF",
};

interface ThemeContextProps {
  theme: Theme;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextProps>({
  theme: lightTheme,
  toggleTheme: () => {},
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(lightTheme);

  const toggleTheme = () => {
    setTheme((prev) => (prev === darkTheme ? lightTheme : darkTheme));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
