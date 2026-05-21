"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const main = document.getElementById("snap-main");
    if (!main) return;
    const onScroll = () => setVisible(main.scrollTop > window.innerHeight * 0.5);
    main.addEventListener("scroll", onScroll, { passive: true });
    return () => main.removeEventListener("scroll", onScroll);
  }, []);

  const goto = () =>
    window.dispatchEvent(new CustomEvent("scrollToSection", { detail: { id: "hero" } }));

  return (
    <button
      onClick={goto}
      className="fixed bottom-8 left-8 z-50 flex items-center gap-1.5 text-xs px-4 py-2 rounded-full"
      style={{
        background: "rgba(0,0,0,0.35)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        border: "1px solid rgba(255,255,255,0.20)",
        color: "rgba(255,255,255,0.80)",
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
        transform: visible ? "translateY(0)" : "translateY(10px)",
        transition: "opacity 0.3s ease, transform 0.3s ease, background 0.2s ease",
      }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(0,0,0,0.55)"; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(0,0,0,0.35)"; }}
    >
      <ArrowUp size={13} />
      맨위로
    </button>
  );
}
