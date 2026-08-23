"use client";

import { useEffect, useRef } from "react";
import RevealTitle from "@/components/RevealTitle";

const techStack = [
  { label: "FRONTEND", items: ["React", "Next.js", "TypeScript", "Tailwind CSS"] },
  { label: "STATE", items: ["Zustand", "React Query"] },
  { label: "REAL-TIME", items: ["SSE", "dnd-kit"] },
  { label: "TOOLS", items: ["Figma", "Kubb", "Git", "Minio"] },
];

const notes = [
  {
    tag: "MIGRATION",
    title: "App Router Migration",
    desc: "Legacy Page Router 코드를 Next.js App Router 아키텍처로 전담 마이그레이션했습니다.",
  },
  {
    tag: "STANDARDS",
    title: "Web Standards & A11y",
    desc: "가속 물리 기반 스크롤 컨트롤, 키보드 포커싱, 의미론적 마크업을 지키며 완결성 있는 UI를 추구합니다.",
  },
  {
    tag: "STABILITY",
    title: "인증 안정성 & 자동화",
    desc: "Kubb 기반 OpenAPI 연동으로 타입 추론을 자동화하고, 401 Interceptor 큐 처리로 통신 안정성을 확보했습니다.",
  },
];

export default function About() {
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
      id="about"
      className="snap-start min-h-screen md:h-screen relative overflow-visible md:overflow-hidden flex flex-col justify-center px-6 md:px-16 py-24 md:py-16"
    >
      <div
        className="absolute inset-0"
        style={{ backgroundImage: "url('/bg-section.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}
      />
      <div className="absolute inset-0 bg-neutral-950/92 backdrop-blur-[6px] z-[1]" />

      <div ref={ref} className="relative z-10 max-w-6xl mx-auto w-full flex flex-col gap-8 md:gap-10">
        <div>
          <p className="scroll-anim mono text-xs font-bold tracking-[0.45em] uppercase text-amber-400 mb-1">
            02 — About
          </p>
          <RevealTitle text="About Me" className="text-4xl font-bold text-white section-title" baseDelay={0.08} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-12">
          {/* 왼쪽: 바이오 */}
          <div className="scroll-anim md:col-span-3 flex flex-col gap-5" style={{ transitionDelay: "0.15s" }}>
            <p className="text-2xl md:text-[2.1rem] font-bold leading-snug text-white">
              SSE 기반 실시간 스트리밍과 복잡한 UI 상태 동기화를 고민하는 1년차 프론트엔드 개발자입니다.
            </p>
            <div className="flex flex-col gap-4 text-base text-neutral-300 leading-relaxed max-w-xl">
              <p>
                커스텀 SSE 클라이언트로 실시간 진행률·알림 스트리밍을 구현하고, Zustand·React Query로 여러 상태가 동시에 갱신되는 UI를 관리해왔습니다. 서비스 기획 경험을 바탕으로 기획 의도를 이해하고 협업하는 것에도 강점이 있습니다.
              </p>
              <p>
                제품 초기 기획 구체화 단계부터 참여해 UI 표준화, 프론트 아키텍처 설계, 실서비스 배포까지 단독 전담하며 프로덕트 오너십을 증명해 왔습니다.
              </p>
            </div>

            {/* 로그 스타일 노트 리스트 */}
            <div className="mt-2 flex flex-col">
              {notes.map((n, i) => (
                <div
                  key={n.tag}
                  className="scroll-anim flex items-start gap-4 md:gap-6 py-4 border-t border-white/8 last:border-b"
                  style={{ transitionDelay: `${0.3 + i * 0.08}s` }}
                >
                  <span className="mono text-[10px] font-bold tracking-widest text-neutral-500 pt-0.5 w-[84px] shrink-0">
                    {n.tag}
                  </span>
                  <div>
                    <h3 className="text-sm font-bold text-white mb-1">{n.title}</h3>
                    <p className="text-xs md:text-[13px] leading-relaxed text-neutral-400">{n.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 오른쪽: 스펙 시트 */}
          <div
            className="scroll-anim glass-dark rounded-xl p-6 md:p-7 md:col-span-2 flex flex-col gap-5 h-fit"
            style={{ transitionDelay: "0.22s" }}
          >
            <div className="flex items-center justify-between">
              <span className="mono text-[10px] font-bold tracking-widest text-neutral-500">STACK.spec</span>
              <span className="live-dot" />
            </div>
            <div className="flex flex-col gap-4">
              {techStack.map(({ label, items }) => (
                <div key={label} className="flex flex-col gap-1.5 border-b border-white/6 pb-3.5 last:border-b-0 last:pb-0">
                  <span className="mono text-[10px] font-bold tracking-widest text-amber-400/90">{label}</span>
                  <span className="text-[13.5px] text-neutral-200 leading-relaxed">{items.join(" · ")}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
