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
  text: "white",
  cardBackground: "#2F2F2F",
  cardText: "white",
  dateBackground: "#3A3A3C",
  dateText: "white",
  numericBackground: "white",
  numericText: "black",
  navBarBackground: "#1F1F1F",
  navBarText: "white",
};

const lightTheme: Theme = {
  background: "#F0F0F0",
  text: "black",
  cardBackground: "white",
  cardText: "black",
  dateBackground: "#E5E5E5",
  dateText: "black",
  numericBackground: "white",
  numericText: "black",
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
