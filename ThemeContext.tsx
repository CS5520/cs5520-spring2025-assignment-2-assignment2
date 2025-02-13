import React, { createContext, useContext, useState, ReactNode } from "react";
import { StyleSheet } from "react-native";

const themes = {
  light: {
    backgroundColor: "#E5E5E5",
    textColor: "#363636",
  },
  dark: {
    backgroundColor: "#363636",
    textColor: "#E5E5E5",
  },
};

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  themeStyles: typeof themes.light;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>("light");

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider
      value={{ theme, themeStyles: themes[theme], toggleTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};