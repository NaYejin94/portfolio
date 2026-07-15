"use client";

import { useEffect, useRef } from "react";

const SECTIONS = [
  "hero",
  "about",
  "projects",
  "project-aivis",
  "project-poolim",
  "project-wizplus",
  "contact",
];
const DURATION = 950; // ms

function easeInOutSine(t: number): number {
  return -(Math.cos(Math.PI * t) - 1) / 2;
}

function smoothScroll(container: HTMLElement, targetY: number, onDone: () => void) {
  const startY = container.scrollTop;
  const diff = targetY - startY;
  if (diff === 0) { onDone(); return; }
  let startTime: number | null = null;

  function step(ts: number) {
    if (startTime === null) startTime = ts;
    const progress = Math.min((ts - startTime) / DURATION, 1);
    container.scrollTop = startY + diff * easeInOutSine(progress);
    if (progress < 1) requestAnimationFrame(step);
    else onDone();
  }

  requestAnimationFrame(step);
}

export default function ScrollController() {
  const current = useRef(0);
  const locked = useRef(false);
  const touchStartY = useRef(0);

  useEffect(() => {
    const container = document.getElementById("snap-main");
    if (!container) return;

    const go = (idx: number) => {
      if (locked.current) return;
      const target = Math.max(0, Math.min(idx, SECTIONS.length - 1));
      if (target === current.current) return;
      locked.current = true;
      current.current = target;
      smoothScroll(container, target * window.innerHeight, () => {
        locked.current = false;
      });
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      go(current.current + (e.deltaY > 0 ? 1 : -1));
    };

    const onKey = (e: KeyboardEvent) => {
      if (["ArrowDown", "PageDown"].includes(e.key)) { e.preventDefault(); go(current.current + 1); }
      if (["ArrowUp", "PageUp"].includes(e.key)) { e.preventDefault(); go(current.current - 1); }
    };

    const onTouchStart = (e: TouchEvent) => { touchStartY.current = e.touches[0].clientY; };
    const onTouchEnd = (e: TouchEvent) => {
      const delta = touchStartY.current - e.changedTouches[0].clientY;
      if (Math.abs(delta) > 50) go(current.current + (delta > 0 ? 1 : -1));
    };

    // Navbar / SideNav 에서 발행하는 커스텀 이벤트
    const onGoto = (e: Event) => {
      const { id } = (e as CustomEvent<{ id: string }>).detail;
      const idx = SECTIONS.indexOf(id);
      if (idx !== -1) go(idx);
    };

    container.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKey);
    container.addEventListener("touchstart", onTouchStart, { passive: true });
    container.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("scrollToSection", onGoto);

    return () => {
      container.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKey);
      container.removeEventListener("touchstart", onTouchStart);
      container.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("scrollToSection", onGoto);
    };
  }, []);

  return null;
}
