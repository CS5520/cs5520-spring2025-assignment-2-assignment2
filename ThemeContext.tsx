import React, { createContext, useContext, useState } from "react";
import { lightStyles, darkStyles } from "./constants/styles";

// Defining a theme type with background color and text color properties
type Theme = { backgroundColor: string; textColor: string };

// Defining the context type for the ThemeContext
interface ThemeContextType {
  theme: Theme;  // The current theme object
  styles: typeof lightStyles | typeof darkStyles;  // The current styles based on the theme
  toggleTheme: () => void;  // Function to toggle between light and dark themes
}

// Creating the context with a default value of undefined
export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Provider component that will provide the theme context to its children
export const ThemeProvider: React.FC<{ children: React.ReactNode; mockToggleTheme?: () => void }> = ({
  children,
}) => {
  // State to store the current theme (light or dark)
  const [theme, setTheme] = useState<Theme>({ backgroundColor: "white", textColor: "black" });

  // Function to toggle between light and dark themes
  const toggleTheme = () => {
    setTheme((prevTheme) =>
      prevTheme.backgroundColor === "white"
        ? { backgroundColor: "black", textColor: "white" }  // Switch to dark theme
        : { backgroundColor: "white", textColor: "black" }  // Switch to light theme
    );
  };

  // Choose the styles based on the current theme
  const currentStyles = theme.backgroundColor === "white" ? lightStyles : darkStyles;

  return (
    // Providing the current theme, styles, and toggle function to children
    <ThemeContext.Provider value={{ theme, styles: currentStyles, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to access the ThemeContext and get the current theme and styles
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  // Throw an error if useTheme is used outside of a ThemeProvider
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
