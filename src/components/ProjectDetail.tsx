"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { Monitor, TrendingUp, Globe, ArrowLeft } from "lucide-react";
import RevealTitle from "@/components/RevealTitle";

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
  icon: "monitor" | "trending" | "globe";
  images: string[];
};

const iconMap = {
  monitor: Monitor,
  trending: TrendingUp,
  globe: Globe,
};

function Screenshots({ images }: { images: string[] }) {
  const frameStyle: React.CSSProperties = {
    borderRadius: "16px",
    overflow: "hidden",
    boxShadow: "0 12px 40px rgba(0,0,0,0.5)",
    border: "1px solid rgba(255,255,255,0.1)",
    position: "relative",
  };

  if (images.length === 1) {
    return (
      <div className="img-wipe" style={{ ...frameStyle, width: "100%", height: "100%", minHeight: 300 }}>
        <Image src={images[0]} alt="screenshot" fill className="object-cover object-top" sizes="60vw" priority />
      </div>
    );
  }

  // 2 screenshots — 위아래 배치
  return (
    <div className="flex flex-col gap-3 h-full">
      {images.map((src, i) => (
        <div key={i} className="img-wipe" style={{ ...frameStyle, flex: 1, minHeight: 0, position: "relative" }}>
          <Image src={src} alt={`screenshot ${i + 1}`} fill className="object-cover object-top" sizes="60vw" priority />
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
      className="snap-start h-screen relative overflow-hidden flex flex-col px-6 md:px-16 pt-24 pb-16 md:pt-28 md:pb-20"
    >
      {/* 백그라운드 레이어 및 가독성 100% 확보를 위한 딥 블랙 오버레이 */}
      <div
        className="absolute inset-0"
        style={{ backgroundImage: "url('/bg-section.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}
      />
      <div className="absolute inset-0 bg-slate-950/92 backdrop-blur-[6px] z-[1]" />

      <div ref={ref} className="relative z-10 max-w-6xl mx-auto w-full h-full flex flex-col justify-between gap-6 min-h-0">

        {/* 헤더 (고정 영역) */}
        <div className="flex items-center justify-between shrink-0">
          <div>
            <p className="scroll-anim text-xs font-bold tracking-[0.45em] uppercase text-blue-400 mb-1">
              {String(index + 4).padStart(2, "0")} — Project Detail
            </p>
            <RevealTitle text={data.title} className="text-4xl font-bold text-white section-title" baseDelay={0.06} />
          </div>
          <div
            className="scroll-anim flex items-center gap-2.5 px-4.5 py-2.5 rounded-full glass-dark border border-white/10"
            style={{ transitionDelay: "0.10s" }}
          >
            <span className="p-1 rounded bg-blue-500/10 text-blue-400">
              <Icon size={14} />
            </span>
            <span className="text-sm font-medium text-slate-200">{data.subtitle}</span>
            <span className="text-xs ml-1 text-slate-400">| {data.period}</span>
          </div>
        </div>

        {/* 본문 그리드 (남은 높이를 유연하게 채워 이미지/텍스트 축소 및 여백 보존) */}
        <div className="grid grid-cols-5 gap-5 flex-1 min-h-0">
          {/* 스크린샷 왼쪽 — 작은 화면에서는 스크린샷 숨김 */}
          <div className="scroll-anim media-reveal hidden md:block col-span-3 h-full min-h-0" style={{ transitionDelay: "0.16s" }}>
            <Screenshots images={data.images} />
          </div>
          <div className="col-span-5 md:col-span-2 flex flex-col gap-4 h-full min-h-0">
            <MetaCard data={data} delay="0.22s" />
            <FeaturesCard data={data} delay="0.30s" />
          </div>
        </div>

        {/* 돌아가기 버튼 (고정 영역) */}
        <div className="flex justify-end shrink-0">
          <button
            className="scroll-anim flex items-center gap-1.5 text-xs px-4.5 py-2.5 rounded-xl transition-all duration-200 bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10 hover:text-white"
            style={{
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              transitionDelay: "0.45s",
            }}
            onClick={() => window.dispatchEvent(new CustomEvent("scrollToSection", { detail: { id: "projects" } }))}
          >
            <ArrowLeft size={13} />
            목록으로
          </button>
        </div>

      </div>
    </section>
  );
}

function MetaCard({ data, delay }: { data: ProjectData; delay: string }) {
  return (
    <div className="scroll-anim glass-dark border border-white/10 rounded-2xl p-5 flex flex-col gap-4 shrink-0" style={{ transitionDelay: delay }}>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-xs font-bold tracking-widest uppercase mb-1.5 text-blue-400">Period</p>
          <p className="text-base font-semibold text-white">{data.period}</p>
        </div>
        <div>
          <p className="text-xs font-bold tracking-widest uppercase mb-1.5 text-blue-400">Role</p>
          <p className="text-base font-semibold text-white">{data.role}</p>
        </div>
      </div>
      <div>
        <p className="text-xs font-bold tracking-widest uppercase mb-2 text-blue-400">Tech Stack</p>
        <div className="flex flex-wrap gap-1.5">
          {data.stack.map((s) => (
            <span key={s} className="px-2.5 py-1 text-xs font-semibold rounded bg-white/5 border border-white/5 text-slate-300">
              {s}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function FeaturesCard({ data, delay }: { data: ProjectData; delay: string }) {
  return (
    <div className="scroll-anim glass-dark border border-white/10 rounded-2xl p-6 flex flex-col gap-4.5 flex-1 min-h-0 overflow-hidden" style={{ transitionDelay: delay }}>
      {/* 주요 기능 */}
      <div className="shrink-0">
        <p className="text-xs font-bold tracking-widest uppercase text-blue-400">주요 기능</p>
      </div>
      <ul className="flex flex-col gap-2.5 shrink-0">
        {data.features.map((f, i) => (
          <li key={i} className="flex items-start gap-2.5 text-sm leading-relaxed text-slate-200">
            <span className="mt-2 shrink-0 rounded-full bg-blue-400/80 w-1.5 h-1.5" />
            <span>{f}</span>
          </li>
        ))}
      </ul>

      {/* 구분선 */}
      <hr className="border-white/5 shrink-0" />

      {/* 기술적 도전 & 해결 */}
      <div className="shrink-0">
        <p className="text-xs font-bold tracking-widest uppercase text-blue-400">
          기술적 도전 &amp; 해결
        </p>
      </div>
      <ul className="flex flex-col gap-4 flex-1 overflow-y-auto pr-1">
        {data.challenges.map((c, i) => (
          <li key={i} className="flex items-start gap-2.5 text-sm leading-relaxed text-slate-200">
            <span className="mt-2 shrink-0 rounded-sm bg-purple-400/80 w-1.5 h-1.5" />
            <div>
              <p className="font-bold text-white text-sm md:text-base leading-snug">{c.title}</p>
              <p className="text-xs md:text-sm text-slate-400 leading-relaxed mt-1">{c.desc}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
