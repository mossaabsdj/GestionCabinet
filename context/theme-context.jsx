"use client";

import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export const themes = [
  { name: "Default", value: "default", color: "oklch(0.6 0.15 250)" },
  { name: "Blue", value: "blue", color: "oklch(0.6 0.18 250)" },
  { name: "Green", value: "green", color: "oklch(0.55 0.15 150)" },
  { name: "Purple", value: "purple", color: "oklch(0.65 0.2 300)" },
  { name: "Orange", value: "orange", color: "oklch(0.65 0.18 40)" },
];

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("default");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "default";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  const changeTheme = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme: changeTheme, themes }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);