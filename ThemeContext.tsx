import React, { createContext, useContext, useState } from "react";

// 定义主题样式
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

// 创建 ThemeContext
const ThemeContext = createContext({
  theme: themes.light, // 默认是 light 主题
  toggleTheme: () => {}, // 切换主题的函数
});

// 创建 ThemeProvider 组件
export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState(themes.light);

  // 切换主题
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === themes.light ? themes.dark : themes.light));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// 自定义 Hook，方便在组件中使用 ThemeContext
export const useTheme = () => useContext(ThemeContext);