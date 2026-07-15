"use client";

import { useEffect, useRef } from "react";
import RevealTitle from "@/components/RevealTitle";

const techStack = [
  { label: "FRONTEND", items: ["React", "Next.js", "TypeScript", "Tailwind CSS"] },
  { label: "STATE", items: ["Zustand", "React Query"] },
  { label: "TOOLS", items: ["Figma", "Kubb", "Git"] },
  { label: "ETC", items: ["SSE", "dnd-kit", "Minio"] },
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
      className="snap-start h-screen relative overflow-hidden flex flex-col justify-center px-6 md:px-16 py-12 md:py-16"
    >
      {/* 백그라운드 레이어 및 딥 블랙 글래스 오버레이 (가독성 100% 확보) */}
      <div
        className="absolute inset-0"
        style={{ backgroundImage: "url('/bg-section.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}
      />
      <div className="absolute inset-0 bg-slate-950/92 backdrop-blur-[6px] z-[1]" />

      <div ref={ref} className="relative z-10 max-w-6xl mx-auto w-full flex flex-col gap-6 md:gap-8">
        {/* 타이틀 */}
        <div>
          <p className="scroll-anim text-xs font-bold tracking-[0.45em] uppercase text-blue-400 mb-1">
            02 — About
          </p>
          <RevealTitle text="About Me" className="text-4xl font-bold text-white section-title" baseDelay={0.08} />
        </div>

        {/* 벤토 그리드 대시보드 (다크 글래스모피즘 테마) */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-5">
          
          {/* Box 1: 프로필 및 메인 바이오 (2x2) */}
          <div
            className="scroll-anim glass-dark rounded-2xl p-6 md:p-8 col-span-1 md:col-span-2 md:row-span-2 flex flex-col gap-6 justify-between border border-white/10"
            style={{ transitionDelay: "0.15s" }}
          >
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold tracking-widest text-slate-400">DEVELOPER BIOGRAPHY</span>
              </div>
              <p className="text-2xl md:text-3xl font-bold leading-snug text-white">
                9개월간 프로덕트 3건을<br />
                기획부터 배포까지 이어온<br />
                <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                  1년차 프론트엔드
                </span>{" "}
                개발자입니다.
              </p>
              <hr className="border-white/10" />
              <div className="flex flex-col gap-4 text-base text-slate-300 leading-relaxed">
                <p>
                  제품 초기 기획 구체화 단계부터 참여하여 UI 표준화, 프론트 아키텍처 설계 및 실서비스 배포까지 단독 전담하며 주도적인 프로덕트 오너십을 증명해 왔습니다.
                </p>
                <p>
                  중복 코드를 최소화하고 개발팀의 수작업 프로세스를 차단하는 “자동화 인프라” 구축에 가치가 있다고 믿으며, 웹 표준에 맞는 최적의 사용성을 추구합니다.
                </p>
              </div>
            </div>
          </div>

          {/* Box 2: 기술 스택 대시보드 (2x2) */}
          <div
            className="scroll-anim glass-dark rounded-2xl p-6 md:p-8 col-span-1 md:col-span-2 md:row-span-2 flex flex-col gap-5 border border-white/10"
            style={{ transitionDelay: "0.25s" }}
          >
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold tracking-widest text-slate-400">TECHNICAL SPECIFICATIONS</span>
            </div>

            <div className="flex flex-col gap-4 flex-1 justify-center">
              {techStack.map(({ label, items }) => (
                <div key={label} className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 border-b border-white/5 pb-3.5 last:border-b-0 last:pb-0">
                  <span className="text-xs font-bold tracking-widest shrink-0 w-24 text-indigo-300/80">
                    {label}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {items.map((item) => (
                      <span key={item} className="px-3 py-1 text-sm font-medium rounded-lg bg-white/5 border border-white/10 text-slate-200 hover:border-blue-500/40 hover:text-white transition-all cursor-default">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="text-xs text-slate-500 text-right font-mono">
              Next.js Ecosystem Core Focused
            </div>
          </div>

          {/* Box 3: App Router 단독 마이그레이션 (1x1) */}
          <div
            className="scroll-anim glass-dark rounded-2xl p-6 col-span-1 flex flex-col justify-between h-[175px] border border-white/10 hover:border-blue-500/30 transition-colors"
            style={{ transitionDelay: "0.32s" }}
          >
            <div className="flex justify-between items-start">
              <span className="text-xs font-mono font-bold text-slate-500">MIGRATION</span>
            </div>
            <div>
              <h3 className="text-sm font-extrabold tracking-wider text-white mb-2">
                App Router Migration
              </h3>
              <p className="text-xs leading-relaxed text-slate-300">
                Legacy Page Router 코드를 Next.js 최신 App Router 아키텍처로 전담하여 안정적이고 성능 지향적인 마이그레이션을 주도했습니다.
              </p>
            </div>
          </div>

          {/* Box 4: 웹 접근성 & 인터랙션 디테일 (1x1) */}
          <div
            className="scroll-anim glass-dark rounded-2xl p-6 col-span-1 flex flex-col justify-between h-[175px] border border-white/10 hover:border-purple-500/30 transition-colors"
            style={{ transitionDelay: "0.40s" }}
          >
            <div className="flex justify-between items-start">
              <span className="text-xs font-mono font-bold text-slate-500">STANDARDS</span>
            </div>
            <div>
              <h3 className="text-sm font-extrabold tracking-wider text-white mb-2">
                Web Standards & A11y
              </h3>
              <p className="text-xs leading-relaxed text-slate-300">
                정교하게 반응하는 가속 물리 기반 스크롤 컨트롤, 키보드 포커싱, 의미론적 마크업을 지키며 완결성 있는 UI를 추구합니다.
              </p>
            </div>
          </div>

          {/* Box 5: 개발 생산성 및 인터셉터 자동화 (2x1) */}
          <div
            className="scroll-anim glass-dark rounded-2xl p-6 col-span-1 md:col-span-2 flex flex-col justify-between h-auto md:h-[175px] border border-white/10 hover:border-amber-500/30 transition-colors"
            style={{ transitionDelay: "0.48s" }}
          >
            <div className="flex items-center gap-1.5 mb-2 md:mb-0">
              <span className="text-xs font-bold tracking-widest text-slate-400">DEV VELOCITY & STABILITY</span>
            </div>
            <div>
              <h3 className="text-sm font-extrabold tracking-wider text-white mb-2">
                Productivity Automation & Security Architecture
              </h3>
              <p className="text-xs leading-relaxed text-slate-300">
                Kubb 기반 OpenAPI 연동 스크립트를 커스터마이징하여 프론트엔드 타입 추론을 완전 자동화하였고, 동시성 에러 큐(Concurrency Queue) 방식을 차용한 401 Interceptor 자동 토큰 재갱신 로직을 구축해 통신 안정성을 확보했습니다.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
