"use client";

import { useEffect, useRef } from "react";
import { Monitor, TrendingUp, Globe, ArrowRight } from "lucide-react";
import RevealTitle from "@/components/RevealTitle";

const projects = [
  {
    id: "01",
    title: "AI-VIS",
    category: "WEB SERVICE",
    desc: "지자체 전광판의 영상 송출과 스케줄링을 자동화하는 AI 기반 통합 제어 플랫폼입니다.",
    stack: ["Next.js", "Zustand", "SSE", "Kubb"],
    period: "2025.10 – 2025.12",
    icon: Monitor,
    detailId: "project-aivis",
    highlights: ["fetch + Custom SSE 클라이언트 설계", "JWT Refresh Queue 인터셉터 구현", "dnd-kit 기반 낙관적 업데이트"],
  },
  {
    id: "02",
    title: "POOLIM",
    category: "SaaS / AI",
    desc: "선거 데이터를 정밀 분석하여 승리 전략과 캠페인 예산을 제안하는 AI 컨설팅 솔루션입니다.",
    stack: ["Next.js", "Recharts", "Naver Map API"],
    period: "2025.12 – 진행 중",
    icon: TrendingUp,
    detailId: "project-poolim",
    highlights: ["Middleware 멀티테넌트 라우팅", "Vite → Next.js SEO 고도화"],
  },
  {
    id: "03",
    title: "WIZplus 홈페이지",
    category: "HOMEPAGE",
    desc: "기업 아이덴티티를 스크롤 애니메이션과 현대적인 레이아웃으로 표현한 공식 홈페이지입니다.",
    stack: ["Next.js", "Tailwind CSS", "Minio"],
    period: "2025.11 – 2025.12",
    icon: Globe,
    detailId: "project-wizplus",
    highlights: ["IntersectionObserver 애니메이션", "1인 디자인 및 설계 배포"],
  },
];

export default function Projects() {
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
      id="projects"
      className="snap-start h-screen relative overflow-hidden flex flex-col justify-center px-6 md:px-16 py-12 md:py-16"
    >
      {/* 백그라운드 레이어 및 가독성 100% 확보를 위한 딥 블랙 오버레이 */}
      <div
        className="absolute inset-0"
        style={{ backgroundImage: "url('/bg-section.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}
      />
      <div className="absolute inset-0 bg-neutral-950/92 backdrop-blur-[6px] z-[1]" />

      <div ref={ref} className="relative z-10 max-w-6xl mx-auto w-full flex flex-col gap-6 md:gap-8">
        
        {/* 타이틀 */}
        <div>
          <p className="scroll-anim mono text-xs font-bold tracking-[0.45em] uppercase text-amber-400 mb-1">
            03 — Projects
          </p>
          <RevealTitle text="Projects" className="text-4xl font-bold text-white section-title" baseDelay={0.08} />
        </div>

        {/* 프로젝트 세로 스택 와이드 레이아웃 (럭셔리 에디토리얼 테마) */}
        <div className="flex flex-col gap-4 md:gap-5 w-full">
          {projects.map((project, i) => {
            const goto = () =>
              window.dispatchEvent(new CustomEvent("scrollToSection", { detail: { id: project.detailId } }));

            const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                goto();
              }
            };

            return (
              <div
                key={project.id}
                role="button"
                tabIndex={0}
                className="scroll-anim glass-dark w-full rounded-lg p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 border border-white/10 cursor-pointer group focus:outline-none focus:ring-2 focus:ring-amber-500/50 hover:border-amber-500/30 transition-all hover:bg-neutral-900/40"
                style={{ transitionDelay: `${0.15 + i * 0.1}s` }}
                onClick={goto}
                onKeyDown={onKeyDown}
              >
                {/* 1. 순번 및 기본 요약 메타 정보 */}
                <div className="flex items-start gap-4 md:gap-6 min-w-[240px]">
                  <span className="text-3xl md:text-4xl font-mono font-bold text-amber-500/40 mt-1 shrink-0">
                    {project.id}
                  </span>
                  <div className="flex flex-col gap-1.5">
                    <span className="px-2 py-0.5 text-[10px] font-bold tracking-widest text-neutral-400 bg-white/5 border border-white/5 w-fit rounded">
                      {project.category}
                    </span>
                    <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-amber-400 transition-colors">
                      {project.title}
                    </h3>
                    <span className="text-xs text-neutral-400 font-mono">
                      {project.period}
                    </span>
                  </div>
                </div>

                {/* 2. 상세 설명 및 핵심 강점 (텍스트 전면 가시화 및 크기 업그레이드) */}
                <div className="flex-1 max-w-xl flex flex-col gap-2.5">
                  <p className="text-sm md:text-base text-neutral-200 leading-relaxed font-medium">
                    {project.desc}
                  </p>
                  <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-xs md:text-sm text-neutral-400">
                    {project.highlights.map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 3. 우측: 기술 스택 뱃지 배열 및 상세 보기 탐색 영역 */}
                <div className="flex flex-row md:flex-col items-start md:items-end justify-between md:justify-center gap-4 min-w-[200px] border-t border-white/5 pt-4 md:border-t-0 md:pt-0 shrink-0">
                  <div className="flex flex-wrap gap-1.5 md:justify-end">
                    {project.stack.map((tech) => (
                      <span key={tech} className="px-2.5 py-0.5 text-[10px] md:text-xs font-semibold rounded bg-white/5 border border-white/5 text-neutral-300">
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center gap-1.5 text-xs md:text-sm text-amber-400 font-bold group-hover:translate-x-1.5 transition-transform mt-1">
                    <span>Explore</span>
                    <ArrowRight size={14} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
