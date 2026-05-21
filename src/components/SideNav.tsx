"use client";

import { useEffect, useState } from "react";

const sections = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "project-aivis", label: "AI-VIS" },
  { id: "project-poolim", label: "POOLIM" },
  { id: "project-wizplus", label: "WIZplus" },
  { id: "project-coloring", label: "컬러링 앱" },
  { id: "contact", label: "Contact" },
];

export default function SideNav() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const main = document.getElementById("snap-main");
    if (!main) return;

    const onScroll = () => {
      const idx = Math.round(main.scrollTop / window.innerHeight);
      setActive(Math.min(idx, sections.length - 1));
    };

    main.addEventListener("scroll", onScroll, { passive: true });
    return () => main.removeEventListener("scroll", onScroll);
  }, []);

  const goto = (id: string) => {
    window.dispatchEvent(new CustomEvent("scrollToSection", { detail: { id } }));
  };

  return (
    <div
      className="hidden md:flex fixed right-7 top-1/2 -translate-y-1/2 z-50 flex-col items-center gap-4 px-3 py-4 rounded-full"
      style={{
        background: "rgba(0, 0, 0, 0.40)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        border: "1px solid rgba(255,255,255,0.18)",
        boxShadow: "0 4px 20px rgba(0,0,0,0.25)",
      }}
    >
      {sections.map(({ id, label }, i) => (
        <button
          key={id}
          onClick={() => goto(id)}
          title={label}
          className="group relative flex items-center justify-center"
        >
          {/* 호버 레이블 */}
          <span
            className="absolute right-8 text-white text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none px-2.5 py-1 rounded-full"
            style={{ background: "rgba(0,0,0,0.6)" }}
          >
            {label}
          </span>

          {/* 닷 */}
          <div
            className="rounded-full transition-all duration-400"
            style={{
              width: active === i ? 11 : 7,
              height: active === i ? 11 : 7,
              background: active === i ? "#ffffff" : "rgba(255,255,255,0.5)",
              boxShadow: active === i
                ? "0 0 0 3px rgba(255,255,255,0.15), 0 0 10px rgba(255,255,255,0.4)"
                : "none",
            }}
          />
        </button>
      ))}
    </div>
  );
}
