"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import RevealTitle from "@/components/RevealTitle";

export type ProjectData = {
  id: string;
  sectionId: string;
  title: string;
  subtitle: string;
  summary: string;
  period: string;
  role: string;
  stack: string[];
  features: string[];
  challenges: { title: string; desc: string }[];
  icon: "monitor" | "trending" | "globe";
  images: string[];
};

function useRevealOnEnter(ref: React.RefObject<HTMLDivElement | null>) {
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
  }, [ref]);
}

function goto(id: string) {
  window.dispatchEvent(new CustomEvent("scrollToSection", { detail: { id } }));
}

function SectionBackground() {
  return (
    <>
      <div
        className="absolute inset-0 bg-photo"
        style={{ backgroundImage: "url('/bg-section.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}
      />
      <div className="absolute inset-0 bg-neutral-950/92 backdrop-blur-[6px] z-[1]" />
    </>
  );
}

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
        <Image
          src={images[0]}
          alt="screenshot"
          fill
          className="object-cover object-top"
          sizes="(min-width: 1152px) 1152px, 100vw"
          quality={90}
          priority
        />
      </div>
    );
  }

  return (
    <div className="flex flex-row gap-4 h-full">
      {images.map((src, i) => (
        <div key={i} className="img-wipe flex-1 min-w-0" style={{ ...frameStyle, position: "relative" }}>
          <Image
            src={src}
            alt={`screenshot ${i + 1}`}
            fill
            className="object-cover object-top"
            sizes="(min-width: 1152px) 568px, 50vw"
            quality={90}
            priority
          />
        </div>
      ))}
    </div>
  );
}

function MetaBar({ data, delay }: { data: ProjectData; delay: string }) {
  return (
    <div
      className="scroll-anim glass-dark border border-white/10 rounded-lg px-6 py-5 flex flex-col md:flex-row md:items-center gap-5 md:gap-10 shrink-0"
      style={{ transitionDelay: delay }}
    >
      <div className="flex gap-8 shrink-0">
        <div>
          <p className="text-xs font-bold tracking-widest uppercase mb-1.5 text-amber-400">Period</p>
          <p className="text-base font-semibold text-white whitespace-nowrap">{data.period}</p>
        </div>
        <div>
          <p className="text-xs font-bold tracking-widest uppercase mb-1.5 text-amber-400">Role</p>
          <p className="text-base font-semibold text-white whitespace-nowrap">{data.role}</p>
        </div>
      </div>
      <div className="hidden md:block w-px h-10 bg-white/10 shrink-0" />
      <div className="min-w-0 flex-1">
        <p className="text-xs font-bold tracking-widest uppercase mb-2 text-amber-400">Tech Stack</p>
        <div className="flex flex-wrap gap-1.5">
          {data.stack.map((s) => (
            <span key={s} className="px-2.5 py-1 text-xs font-semibold rounded bg-white/5 border border-white/5 text-neutral-300">
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
    <div className="scroll-anim glass-dark border border-white/10 rounded-lg p-6 flex flex-col gap-4.5 shrink-0" style={{ transitionDelay: delay }}>
      <p className="text-xs font-bold tracking-widest uppercase text-amber-400">주요 기능</p>
      <ul className="flex flex-col gap-2.5">
        {data.features.map((f, i) => (
          <li key={i} className="flex items-start gap-2.5 text-sm leading-relaxed text-neutral-200">
            <span className="mt-2 shrink-0 rounded-full bg-amber-400/80 w-1.5 h-1.5" />
            <span>{f}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ── 1페이지: 개요 (헤더 + 스크린샷 + Period/Role/Tech Stack) ── */
export function ProjectOverview({ data, index }: { data: ProjectData; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useRevealOnEnter(ref);
  const num = String(index + 4).padStart(2, "0");

  return (
    <section
      id={data.sectionId}
      className="snap-start min-h-screen md:h-screen relative overflow-visible md:overflow-hidden flex flex-col px-6 md:px-16 pt-24 pb-16 md:pt-28 md:pb-20"
    >
      <SectionBackground />

      <div ref={ref} className="relative z-10 max-w-6xl mx-auto w-full md:h-full flex flex-col md:justify-between gap-6 md:min-h-0">
        <div className="shrink-0">
          <p className="scroll-anim mono text-xs font-bold tracking-[0.45em] uppercase text-amber-400 mb-1">
            {num}.1 — Project Overview
          </p>
          <RevealTitle text={data.title} className="text-4xl font-bold text-white section-title" baseDelay={0.06} />
          <p
            className="scroll-anim text-sm md:text-base text-neutral-300 leading-relaxed mt-3 max-w-xl"
            style={{ transitionDelay: "0.14s" }}
          >
            {data.summary}
          </p>
        </div>

        <div className="flex flex-col gap-5 md:flex-1 md:min-h-0">
          <div className="scroll-anim media-reveal hidden md:block md:flex-1 md:min-h-0" style={{ transitionDelay: "0.16s" }}>
            <Screenshots images={data.images} />
          </div>
          <MetaBar data={data} delay="0.22s" />
        </div>

        <div className="flex justify-end shrink-0">
          <button
            className="scroll-anim flex items-center gap-1.5 text-xs px-4.5 py-2.5 rounded-xl transition-all duration-200 bg-white/5 border border-white/10 text-neutral-300 hover:bg-white/10 hover:text-white"
            style={{ backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", transitionDelay: "0.45s" }}
            onClick={() => goto(`${data.sectionId}-challenges`)}
          >
            주요 기능 & 기술적 도전 보기
            <ArrowRight size={13} />
          </button>
        </div>
      </div>
    </section>
  );
}

/* ── 2페이지: 주요 기능 + 기술적 도전 & 해결 ── */
export function ProjectChallenges({ data, index }: { data: ProjectData; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useRevealOnEnter(ref);
  const num = String(index + 4).padStart(2, "0");

  return (
    <section
      id={`${data.sectionId}-challenges`}
      className="snap-start min-h-screen md:h-screen relative overflow-visible md:overflow-hidden flex flex-col px-6 md:px-16 pt-24 pb-16 md:pt-28 md:pb-20"
    >
      <SectionBackground />

      <div ref={ref} className="relative z-10 max-w-6xl mx-auto w-full md:h-full flex flex-col md:justify-between gap-6 md:min-h-0">
        <div className="shrink-0">
          <p className="scroll-anim mono text-xs font-bold tracking-[0.45em] uppercase text-amber-400 mb-1">
            {num}.2 — Technical Challenge
          </p>
          <RevealTitle text={data.title} className="text-4xl font-bold text-white section-title" baseDelay={0.06} />
        </div>

        <div className="flex flex-col gap-5 md:flex-1 md:min-h-0">
          <FeaturesCard data={data} delay="0.14s" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:flex-1 md:min-h-0">
            {data.challenges.map((c, i) => (
              <div
                key={i}
                className="scroll-anim glass-dark border border-white/10 rounded-lg p-6 flex flex-col gap-3"
                style={{ transitionDelay: `${0.26 + i * 0.1}s` }}
              >
                <span className="mono text-xs font-bold text-amber-400">{String(i + 1).padStart(2, "0")}</span>
                <p className="font-bold text-white text-lg leading-snug">{c.title}</p>
                <p className="text-sm text-neutral-400 leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-between shrink-0">
          <button
            className="scroll-anim flex items-center gap-1.5 text-xs px-4.5 py-2.5 rounded-xl transition-all duration-200 bg-white/5 border border-white/10 text-neutral-300 hover:bg-white/10 hover:text-white"
            style={{ backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", transitionDelay: "0.45s" }}
            onClick={() => goto(data.sectionId)}
          >
            <ArrowLeft size={13} />
            개요
          </button>
          <button
            className="scroll-anim flex items-center gap-1.5 text-xs px-4.5 py-2.5 rounded-xl transition-all duration-200 bg-white/5 border border-white/10 text-neutral-300 hover:bg-white/10 hover:text-white"
            style={{ backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", transitionDelay: "0.5s" }}
            onClick={() => goto("projects")}
          >
            <ArrowLeft size={13} />
            목록으로
          </button>
        </div>
      </div>
    </section>
  );
}
