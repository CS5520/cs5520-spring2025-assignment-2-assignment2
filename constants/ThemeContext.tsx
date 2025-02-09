import React, { createContext, useContext, useState } from "react";
import { StyleSheet } from "react-native";

interface Theme {
  background: string;
  text: string;
  button: string;
}

const lightTheme: Theme = {
  background: "white",
  text: "black",
  button: "blue",
};

const darkTheme: Theme = {
  background: "black",
  text: "white",
  button: "gray",
};

const ThemeContext = createContext<{
  theme: Theme;
  toggleTheme: () => void;
}>({
  theme: lightTheme,
  toggleTheme: () => {},
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(lightTheme);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === lightTheme ? darkTheme : lightTheme));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
