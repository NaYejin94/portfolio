"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    setTheme(document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark");
  }, []);

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  };

  return (
    <button
      onClick={toggle}
      aria-label="다크모드/라이트모드 전환"
      title={theme === "dark" ? "라이트 모드로 전환" : "다크 모드로 전환"}
      className="fixed top-4 right-4 md:top-5 md:right-6 z-[60] flex items-center justify-center w-9 h-9 rounded-full text-white/80 hover:text-white transition-colors"
      style={{
        background: "rgba(0,0,0,0.35)",
        border: "1px solid rgba(255,255,255,0.18)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
      }}
    >
      {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
    </button>
  );
}
