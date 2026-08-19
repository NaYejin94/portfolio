"use client";

import { useEffect, useRef, useState } from "react";
import { Mail, ChevronDown } from "lucide-react";

function GithubIcon({ size = 16, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.21.08 1.85 1.24 1.85 1.24 1.07 1.84 2.81 1.31 3.5 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02.005 2.04.14 3 .4 2.28-1.55 3.29-1.23 3.29-1.23.66 1.66.25 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58C20.57 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

const PHRASES = [
  "React / Next.js / TypeScript",
  "실시간 데이터·상태 동기화를 고민하는 개발자"
  "기획부터 배포까지",
];

function TypedText() {
  const [displayed, setDisplayed] = useState("");
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [started, setStarted] = useState(false);
  const [cursorOn, setCursorOn] = useState(true);

  // 입장 애니메이션 끝난 후 타이핑 시작
  useEffect(() => {
    const t = setTimeout(() => setStarted(true), 1400);
    return () => clearTimeout(t);
  }, []);

  // 타이핑 로직
  useEffect(() => {
    if (!started) return;
    const phrase = PHRASES[phraseIdx];

    if (!isDeleting && displayed === phrase) {
      const t = setTimeout(() => setIsDeleting(true), 2200);
      return () => clearTimeout(t);
    }
    if (isDeleting && displayed === "") {
      const t = setTimeout(() => {
        setIsDeleting(false);
        setPhraseIdx((i) => (i + 1) % PHRASES.length);
      }, 150);
      return () => clearTimeout(t);
    }

    const speed = isDeleting ? 35 : 65;
    const t = setTimeout(() => {
      setDisplayed(isDeleting ? phrase.slice(0, displayed.length - 1) : phrase.slice(0, displayed.length + 1));
    }, speed);
    return () => clearTimeout(t);
  }, [started, displayed, isDeleting, phraseIdx]);

  // 커서 깜빡임
  useEffect(() => {
    const t = setInterval(() => setCursorOn((v) => !v), 520);
    return () => clearInterval(t);
  }, []);

  return (
    <span className="inline-flex items-center">
      <span>{displayed}</span>
      <span
        className="ml-0.5 inline-block w-[2px] h-[1em] rounded-full"
        style={{
          background: "rgba(255,255,255,0.85)",
          opacity: cursorOn ? 1 : 0,
          transition: "opacity 0.1s",
          verticalAlign: "middle",
        }}
      />
    </span>
  );
}

export default function Hero() {
  const bgRef = useRef<HTMLDivElement>(null);

  const scrollToAbout = () => {
    window.dispatchEvent(new CustomEvent("scrollToSection", { detail: { id: "about" } }));
  };

  useEffect(() => {
    const el = bgRef.current;
    if (!el) return;

    // 입장 스케일 애니메이션이 끝난 뒤부터 마우스 패럴럭스로 전환
    const onAnimEnd = () => el.classList.remove("anim-bg-scale");
    el.addEventListener("animationend", onAnimEnd, { once: true });

    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      return () => el.removeEventListener("animationend", onAnimEnd);
    }

    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      el.style.transform = `translate3d(${x * -14}px, ${y * -10}px, 0) scale(1.06)`;
    };
    window.addEventListener("mousemove", onMove);

    return () => {
      el.removeEventListener("animationend", onAnimEnd);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <section
      id="hero"
      className="snap-start h-screen relative overflow-hidden flex flex-col items-center justify-center text-center px-6"
    >
      <div
        ref={bgRef}
        className="absolute inset-0 anim-bg-scale"
        style={{
          backgroundImage: "url('/bg-hero.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-[2px] z-[2]" />

      <div className="relative z-10 flex flex-col items-center gap-5 text-shadow-hero">
        <p className="anim-up d1 text-white/70 text-xs font-semibold tracking-[0.45em] uppercase">
          Frontend Developer Portfolio
        </p>

        <h1 className="anim-up d2 font-extrabold text-white text-center leading-tight">
          <span className="block text-xl md:text-3xl mb-1" style={{ opacity: 0.85 }}>안녕하세요,</span>
          <span className="block text-5xl md:text-7xl">나예진입니다.</span>
        </h1>

        <div className="anim-up d3 flex items-center justify-center px-6 py-2.5 rounded-full border border-white/35 bg-white/10 backdrop-blur-sm text-white text-sm font-medium">
          <TypedText />
        </div>

        <div className="anim-up d4 flex flex-col sm:flex-row items-center gap-4 sm:gap-8 mt-1">
          <a
            href="mailto:nayejin259@gmail.com"
            className="flex items-center gap-2 text-white/75 hover:text-white transition-colors text-sm"
          >
            <Mail size={15} />
            nayejin259@gmail.com
          </a>
          <a
            href="https://github.com/NaYejin94"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-white/75 hover:text-white transition-colors text-sm"
          >
            <GithubIcon size={15} />
            github.com/NaYejin94
          </a>
        </div>
      </div>

      <button
        onClick={scrollToAbout}
        className="anim-up d5 absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5 text-white/40 hover:text-white/70 transition-colors"
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <ChevronDown size={18} className="animate-bounce" />
      </button>
    </section>
  );
}
