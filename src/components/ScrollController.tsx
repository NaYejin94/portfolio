"use client";

import { useEffect, useRef } from "react";
import { SECTIONS } from "@/lib/sections";

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

    const isDesktop = () => window.matchMedia("(min-width: 768px)").matches;

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

    // 모바일/태블릿: 콘텐츠 높이가 화면보다 커질 수 있어 화면 1개=섹션 1개 강제 이동을 쓰지 않고,
    // 자연 스크롤을 그대로 두고 네비게이션 클릭 시에만 해당 섹션으로 부드럽게 이동시킴
    const onGotoMobile = (e: Event) => {
      const { id } = (e as CustomEvent<{ id: string }>).detail;
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    if (!isDesktop()) {
      window.addEventListener("scrollToSection", onGotoMobile);
      return () => window.removeEventListener("scrollToSection", onGotoMobile);
    }

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
      const idx = SECTIONS.indexOf(id as (typeof SECTIONS)[number]);
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
