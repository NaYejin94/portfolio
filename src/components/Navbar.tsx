"use client";

import { useEffect, useState } from "react";
import { SECTIONS, dotGroupId } from "@/lib/sections";

const links = [
  { label: "Home", id: "hero" },
  { label: "About", id: "about" },
  { label: "Projects", id: "projects" },
  { label: "Contact", id: "contact" },
];

export default function Navbar() {
  const [activeSectionId, setActiveSectionId] = useState("hero");

  useEffect(() => {
    const main = document.getElementById("snap-main");
    if (!main) return;

    const onScroll = () => {
      const idx = Math.round(main.scrollTop / window.innerHeight);
      const clamped = Math.min(Math.max(idx, 0), SECTIONS.length - 1);
      setActiveSectionId(SECTIONS[clamped]);
    };

    main.addEventListener("scroll", onScroll, { passive: true });
    return () => main.removeEventListener("scroll", onScroll);
  }, []);

  const goto = (id: string) => {
    window.dispatchEvent(new CustomEvent("scrollToSection", { detail: { id } }));
  };

  // Project overview/challenges 페이지는 모두 "Projects"를 활성으로 표시
  const getActiveLink = (id: string) => {
    const group = dotGroupId(activeSectionId);
    if (id === "projects") return group === "projects" || group.startsWith("project-");
    return group === id;
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-md border-b border-white/8">
      <div className="max-w-6xl mx-auto px-10 h-16 flex items-center justify-between">
        <button onClick={() => goto("hero")} className="text-white font-bold text-lg tracking-widest">
          나예진
        </button>
        <div className="hidden md:flex gap-10">
          {links.map(({ label, id }) => (
            <button
              key={id}
              onClick={() => goto(id)}
              className={`text-sm font-medium transition-colors ${
                getActiveLink(id) ? "text-white" : "text-white/45 hover:text-white/75"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
