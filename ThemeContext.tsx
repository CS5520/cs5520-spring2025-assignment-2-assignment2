
import React, { createContext, useContext, useState } from "react";

const themes = {
  light: {
    backgroundColor: "#fff",
    textColor: "#000",
  },
  dark: {
    backgroundColor: "#121212",
    textColor: "#fff",
  },
};

export const ThemeContext = createContext({
  theme: themes.light, 
  toggleTheme: () => {}, 
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState(themes.light);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === themes.light ? themes.dark : themes.light));

  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};


export const useTheme = () => useContext(ThemeContext);

