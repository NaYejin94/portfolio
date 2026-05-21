"use client";

import { useEffect, useState } from "react";

const ALL_SECTIONS = [
  "hero",
  "about",
  "projects",
  "project-aivis",
  "project-poolim",
  "project-wizplus",
  "project-coloring",
  "contact",
];

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
      const clamped = Math.min(idx, ALL_SECTIONS.length - 1);
      setActiveSectionId(ALL_SECTIONS[clamped]);
    };

    main.addEventListener("scroll", onScroll, { passive: true });
    return () => main.removeEventListener("scroll", onScroll);
  }, []);

  const goto = (id: string) => {
    window.dispatchEvent(new CustomEvent("scrollToSection", { detail: { id } }));
  };

  // Project detail pages all highlight "Projects" in the nav
  const getActiveLink = (id: string) => {
    if (activeSectionId === id) return true;
    if (
      id === "projects" &&
      ["project-aivis", "project-poolim", "project-wizplus", "project-coloring"].includes(activeSectionId)
    )
      return true;
    return false;
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
