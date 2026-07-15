"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!canHover) return;

    document.documentElement.classList.add("custom-cursor-active");

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    let scale = 1;
    let hovering = false;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      const el = e.target as HTMLElement;
      hovering = !!el.closest("a, button, .cursor-hover");
    };
    window.addEventListener("mousemove", onMove);

    const tick = () => {
      const targetScale = hovering ? 1.3 : 1;
      scale += (targetScale - scale) * 0.25;

      if (imgRef.current) {
        imgRef.current.style.transform = `translate3d(${target.x}px, ${target.y}px, 0) translate(-15%, -10%) scale(${scale})`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove("custom-cursor-active");
    };
  }, []);

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      ref={imgRef}
      src="/cursor-arrow.png"
      alt=""
      draggable={false}
      className="fixed top-0 left-0 z-[100] pointer-events-none select-none"
      style={{ width: 36, height: 36, transformOrigin: "15% 10%", willChange: "transform" }}
    />
  );
}
