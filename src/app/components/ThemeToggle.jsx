"use client";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

const ThemeToggle = () => {
   const { theme, setTheme } = useTheme();
    return (
        <button className="cursor-pointer" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
             {theme === "dark" ? <Sun className="h-5 w-5 text-yellow-500" /> : <Moon className="h-5 w-5 text-slate-700" />}
        </button>
    );
};

export default ThemeToggle;