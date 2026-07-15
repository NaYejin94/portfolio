"use client";

import { useEffect, useRef } from "react";
import { Mail } from "lucide-react";

function GithubIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.21.08 1.85 1.24 1.85 1.24 1.07 1.84 2.81 1.31 3.5 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02.005 2.04.14 3 .4 2.28-1.55 3.29-1.23 3.29-1.23.66 1.66.25 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58C20.57 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const items = ref.current?.querySelectorAll(".scroll-anim");
    if (!items) return;
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            observer.unobserve(e.target);
          }
        }),
      { root: document.getElementById("snap-main"), threshold: 0.05 }
    );
    items.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="contact"
      className="snap-start h-screen relative overflow-hidden flex flex-col items-center justify-center text-center px-6"
    >
      {/* Hero와 동일한 배경 — 포트폴리오 수미상관 */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url('/bg-hero.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-[2px] z-[2]" />

      <div ref={ref} className="relative z-10 flex flex-col items-center gap-6">
        {/* 코드 아이콘 */}
        <div
          className="scroll-anim w-16 h-16 rounded-2xl flex items-center justify-center"
          style={{
            background: "rgba(255,255,255,0.15)",
            border: "1px solid rgba(255,255,255,0.30)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
          }}
        >
          <span className="text-white/90 text-2xl font-mono font-bold">{`</>`}</span>
        </div>

        {/* 타이틀 */}
        <div
          className="scroll-anim flex flex-col gap-2"
          style={{ transitionDelay: "0.10s" }}
        >
          <p className="text-xs font-bold tracking-[0.45em] uppercase text-white/60">
            06 — Contact
          </p>
          <h2 className="text-4xl md:text-6xl font-extrabold text-white leading-tight">
            감사합니다.
          </h2>
        </div>

        {/* 서브타이틀 */}
        <p
          className="scroll-anim text-base text-white/70 max-w-sm leading-relaxed"
          style={{ transitionDelay: "0.20s" }}
        >
          함께 더 좋은 서비스를 만들어갈 수 있다면<br />언제든지 연락 주세요.
        </p>

        {/* 연락처 카드 */}
        <div
          className="scroll-anim flex flex-col sm:flex-row items-center gap-4 mt-2"
          style={{ transitionDelay: "0.30s" }}
        >
          <a
            href="mailto:nayejin259@gmail.com"
            className="flex items-center gap-2.5 px-6 py-3 rounded-full text-sm font-medium text-white transition-all duration-200"
            style={{
              background: "rgba(255,255,255,0.15)",
              border: "1px solid rgba(255,255,255,0.30)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.25)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.15)";
            }}
          >
            <Mail size={15} />
            nayejin259@gmail.com
          </a>
          <a
            href="https://github.com/NaYejin94"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 px-6 py-3 rounded-full text-sm font-medium text-white transition-all duration-200"
            style={{
              background: "rgba(255,255,255,0.15)",
              border: "1px solid rgba(255,255,255,0.30)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.25)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.15)";
            }}
          >
            <GithubIcon size={15} />
            github.com/NaYejin94
          </a>
        </div>
      </div>

      {/* 하단 카피라이트 */}
      <p
        className="scroll-anim absolute bottom-8 text-xs text-white/30"
        style={{ transitionDelay: "0.40s" }}
      >
        © 2025 나예진. Built with Next.js & Tailwind CSS.
      </p>
    </section>
  );
}
