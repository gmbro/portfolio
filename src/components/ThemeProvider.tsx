import { useEffect, type ReactNode } from "react";

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("light");
    root.classList.add("dark");
    root.style.colorScheme = "dark";
  }, []);

  return children;
};
