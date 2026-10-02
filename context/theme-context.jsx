"use client";

import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export const themes = [
  { name: "Cyan Médical (Par défaut)", value: "default", color: "oklch(0.52 0.14 200)" },
  { name: "Bleu Royal", value: "blue", color: "oklch(0.52 0.16 250)" },
  { name: "Vert Émeraude", value: "green", color: "oklch(0.52 0.14 150)" },
  { name: "Violet Pédiatrique", value: "purple", color: "oklch(0.52 0.17 300)" },
  { name: "Orange / Ambre", value: "orange", color: "oklch(0.56 0.16 45)" },
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