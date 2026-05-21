"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { Monitor, TrendingUp, Globe, Smartphone, ArrowLeft } from "lucide-react";

const glass: React.CSSProperties = {
  background: "rgba(255, 255, 255, 0.26)",
  backdropFilter: "blur(48px) saturate(1.3)",
  WebkitBackdropFilter: "blur(48px) saturate(1.3)",
  border: "1px solid rgba(255, 255, 255, 0.40)",
  boxShadow: "0 4px 24px rgba(0, 20, 80, 0.08), inset 0 1px 0 rgba(255,255,255,0.55)",
};

const badge: React.CSSProperties = {
  background: "rgba(255, 255, 255, 0.38)",
  border: "1px solid rgba(160, 180, 220, 0.40)",
  color: "rgba(15, 45, 130, 0.90)",
  padding: "3px 10px",
  borderRadius: "999px",
  fontSize: "0.70rem",
  fontWeight: 600,
};

export type ProjectData = {
  id: string;
  sectionId: string;
  title: string;
  subtitle: string;
  period: string;
  role: string;
  stack: string[];
  features: string[];
  challenges: { title: string; desc: string }[];
  icon: "monitor" | "trending" | "globe" | "smartphone";
  images: string[];
  isMobile?: boolean;
};

const iconMap = {
  monitor: Monitor,
  trending: TrendingUp,
  globe: Globe,
  smartphone: Smartphone,
};

function Screenshots({ images, isMobile }: { images: string[]; isMobile?: boolean }) {
  const frameStyle: React.CSSProperties = {
    borderRadius: "12px",
    overflow: "hidden",
    boxShadow: "0 8px 32px rgba(0,20,80,0.18)",
    border: "1px solid rgba(255,255,255,0.5)",
    position: "relative",
  };

  if (isMobile) {
    return (
      <div className="flex items-center justify-center gap-4" style={{ height: "100%" }}>
        {images.map((src, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={i}
            src={src}
            alt="screenshot"
            style={{
              height: "100%",
              width: "auto",
              maxWidth: "100%",
              borderRadius: "12px",
              boxShadow: "0 8px 32px rgba(0,20,80,0.18)",
              border: "1px solid rgba(255,255,255,0.5)",
              objectFit: "contain",
            }}
          />
        ))}
      </div>
    );
  }

  if (images.length === 1) {
    return (
      <div style={{ ...frameStyle, width: "100%", height: "100%", minHeight: 300 }}>
        <Image src={images[0]} alt="screenshot" fill className="object-cover object-top" sizes="60vw" />
      </div>
    );
  }

  // 2 screenshots — 위아래 배치
  return (
    <div className="flex flex-col gap-2 h-full">
      {images.map((src, i) => (
        <div key={i} style={{ ...frameStyle, flex: 1, minHeight: 0, position: "relative" }}>
          <Image src={src} alt={`screenshot ${i + 1}`} fill className="object-cover object-top" sizes="60vw" />
        </div>
      ))}
    </div>
  );
}

export default function ProjectDetail({ data, index }: { data: ProjectData; index: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const items = ref.current?.querySelectorAll(".scroll-anim");
    if (!items) return;
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) { e.target.classList.add("visible"); observer.unobserve(e.target); }
        }),
      { root: document.getElementById("snap-main"), threshold: 0.05 }
    );
    items.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const Icon = iconMap[data.icon];

  return (
    <section
      id={data.sectionId}
      className="snap-start h-screen relative overflow-hidden flex flex-col justify-center px-6 md:px-16 py-12 md:py-14"
    >
      <div
        className="absolute inset-0"
        style={{ backgroundImage: "url('/bg-section.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}
      />

      <div ref={ref} className="relative z-10 max-w-6xl mx-auto w-full flex flex-col gap-4">

        {/* 헤더 */}
        <div className="flex items-center justify-between">
          <div>
            <p className="scroll-anim text-xs font-bold tracking-[0.45em] uppercase text-white/70 mb-1">
              {String(index + 4).padStart(2, "0")} — Project
            </p>
            <h2 className="scroll-anim text-4xl font-bold text-white section-title" style={{ transitionDelay: "0.06s" }}>
              {data.title}
            </h2>
          </div>
          <div
            className="scroll-anim flex items-center gap-2.5 px-4 py-2 rounded-full"
            style={{ ...glass, transitionDelay: "0.10s" }}
          >
            <Icon size={13} color="rgba(15,45,130,0.80)" />
            <span className="text-xs font-medium" style={{ color: "rgba(15,45,130,0.80)" }}>{data.subtitle}</span>
            <span className="text-xs ml-1" style={{ color: "rgba(15,45,130,0.50)" }}>{data.period}</span>
          </div>
        </div>

        {/* 본문 */}
        <div
          className="grid grid-cols-5 gap-4"
          style={{ height: "calc(100vh - 220px)", minHeight: 0 }}
        >
          {data.isMobile ? (
            <>
              {/* 모바일 앱: 스크린샷 좁게 / 정보 넓게 — 작은 화면에서는 스크린샷 숨김 */}
              <div
                className="scroll-anim hidden md:block col-span-2"
                style={{ transitionDelay: "0.16s", height: "100%" }}
              >
                <Screenshots images={data.images} isMobile />
              </div>
              <div className="col-span-5 md:col-span-3 flex flex-col gap-3 min-h-0">
                <MetaCard data={data} glass={glass} badge={badge} delay="0.22s" />
                <FeaturesCard data={data} glass={glass} delay="0.30s" />
              </div>
            </>
          ) : (
            <>
              {/* 웹/기본: 스크린샷 왼쪽 — 작은 화면에서는 스크린샷 숨김 */}
              <div className="scroll-anim hidden md:block col-span-3 min-h-0" style={{ transitionDelay: "0.16s" }}>
                <Screenshots images={data.images} />
              </div>
              <div className="col-span-5 md:col-span-2 flex flex-col gap-3 min-h-0">
                <MetaCard data={data} glass={glass} badge={badge} delay="0.22s" />
                <FeaturesCard data={data} glass={glass} delay="0.30s" />
              </div>
            </>
          )}
        </div>

        {/* 돌아가기 버튼 */}
        <button
          className="scroll-anim absolute bottom-8 right-6 md:right-16 flex items-center gap-1.5 text-xs px-4 py-2 rounded-full transition-all duration-200"
          style={{
            background: "rgba(0,0,0,0.35)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            border: "1px solid rgba(255,255,255,0.20)",
            color: "rgba(255,255,255,0.80)",
            transitionDelay: "0.45s",
          }}
          onClick={() => window.dispatchEvent(new CustomEvent("scrollToSection", { detail: { id: "projects" } }))}
          onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(0,0,0,0.55)"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(0,0,0,0.35)"; }}
        >
          <ArrowLeft size={13} />
          목록으로
        </button>

      </div>
    </section>
  );
}

function MetaCard({ data, glass, badge, delay }: { data: ProjectData; glass: React.CSSProperties; badge: React.CSSProperties; delay: string }) {
  return (
    <div className="scroll-anim rounded-2xl p-5 flex flex-col gap-3.5" style={{ ...glass, transitionDelay: delay }}>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <p className="text-xs font-bold tracking-widest uppercase mb-1.5" style={{ color: "rgba(30,60,140,0.55)" }}>Period</p>
          <p className="text-sm font-semibold" style={{ color: "rgba(15,40,120,0.90)" }}>{data.period}</p>
        </div>
        <div>
          <p className="text-xs font-bold tracking-widest uppercase mb-1.5" style={{ color: "rgba(30,60,140,0.55)" }}>Role</p>
          <p className="text-sm font-semibold" style={{ color: "rgba(15,40,120,0.90)" }}>{data.role}</p>
        </div>
      </div>
      <div>
        <p className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: "rgba(30,60,140,0.55)" }}>Tech Stack</p>
        <div className="flex flex-wrap gap-1.5">
          {data.stack.map((s) => <span key={s} style={badge}>{s}</span>)}
        </div>
      </div>
    </div>
  );
}

function FeaturesCard({ data, glass, delay }: { data: ProjectData; glass: React.CSSProperties; delay: string }) {
  return (
    <div className="scroll-anim rounded-2xl p-5 flex flex-col gap-3 flex-1 min-h-0 overflow-hidden" style={{ ...glass, transitionDelay: delay }}>
      {/* 주요 기능 */}
      <p className="text-xs font-bold tracking-widest uppercase shrink-0" style={{ color: "rgba(30,60,140,0.55)" }}>주요 기능</p>
      <ul className="flex flex-col gap-2 shrink-0">
        {data.features.map((f, i) => (
          <li key={i} className="flex items-start gap-2 text-sm leading-snug" style={{ color: "rgba(15,40,120,0.85)" }}>
            <span className="mt-1.5 shrink-0 rounded-full" style={{ width: 5, height: 5, background: "rgba(60,100,200,0.55)" }} />
            {f}
          </li>
        ))}
      </ul>

      {/* 구분선 */}
      <hr style={{ borderColor: "rgba(100,140,220,0.25)" }} />

      {/* 기술적 도전 & 해결 */}
      <p className="text-xs font-bold tracking-widest uppercase shrink-0" style={{ color: "rgba(30,60,140,0.55)" }}>
        기술적 도전 &amp; 해결
      </p>
      <ul className="flex flex-col gap-2.5 overflow-hidden">
        {data.challenges.map((c, i) => (
          <li key={i} className="flex items-start gap-2 text-sm" style={{ color: "rgba(15,40,120,0.85)" }}>
            <span className="mt-1.5 shrink-0 rounded-sm" style={{ width: 5, height: 5, background: "rgba(100,140,220,0.55)" }} />
            <span className="leading-snug">
              <span className="font-semibold">{c.title}</span>
              <span className="text-xs" style={{ color: "rgba(20,50,130,0.65)" }}> — {c.desc}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
