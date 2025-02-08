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

interface ThemeContextType {
  BGColor: string;
  TXTColor: string;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType>({
  BGColor: themes.light.backgroundColor,
  TXTColor: themes.light.textColor,
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [BGColor, setBGColor] = useState(themes.light.backgroundColor);
  const [TXTColor, setTXTColor] = useState(themes.light.textColor);
  const toggleTheme = () => {
    setBGColor((x) =>
      x === themes.light.backgroundColor
        ? themes.dark.backgroundColor
        : themes.light.backgroundColor
    );
    setTXTColor((x) =>
      x === themes.light.backgroundColor
        ? themes.dark.backgroundColor
        : themes.light.backgroundColor
    );
  };
  return (
    <ThemeContext.Provider value={{ BGColor, TXTColor, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
