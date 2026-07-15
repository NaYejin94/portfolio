"use client";

import { useEffect, useState } from "react";

const TOTAL_SECTIONS = 7;

export default function ProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const main = document.getElementById("snap-main");
    if (!main) return;

    const onScroll = () => {
      const max = (TOTAL_SECTIONS - 1) * window.innerHeight;
      setProgress(Math.min(main.scrollTop / max, 1));
    };

    main.addEventListener("scroll", onScroll, { passive: true });
    return () => main.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-[3px]" style={{ background: "rgba(255,255,255,0.08)" }}>
      <div
        style={{
          height: "100%",
          width: `${progress * 100}%`,
          background: "linear-gradient(90deg, #60a5fa, #a78bfa, #60a5fa)",
          backgroundSize: "200% 100%",
          transition: "width 0.1s linear",
          boxShadow: "0 0 8px rgba(167,139,250,0.6)",
        }}
      />
    </div>
  );
}
