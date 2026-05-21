"use client";

import { useEffect, useRef } from "react";
import { Monitor, TrendingUp, Globe, Smartphone, ArrowRight } from "lucide-react";

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
  padding: "2px 10px",
  borderRadius: "999px",
  fontSize: "0.7rem",
  fontWeight: 600,
};

const projects = [
  {
    id: "01", title: "AI-VIS", category: "WEB SERVICE",
    desc: "지자체 전광판의 영상 송출과 스케줄링을 자동화하는 AI 기반 통합 제어 플랫폼입니다.",
    stack: "Next.js / Zustand / SSE", period: "2025.10 – 2025.12", icon: Monitor, detailId: "project-aivis",
  },
  {
    id: "02", title: "POOLIM", category: "SaaS",
    desc: "선거 데이터를 정밀 분석하여 승리 전략과 캠페인 예산을 제안하는 AI 컨설팅 솔루션입니다.",
    stack: "Next.js / Recharts / Leaflet", period: "2025.12 – 진행 중", icon: TrendingUp, detailId: "project-poolim",
  },
  {
    id: "03", title: "WIZplus 홈페이지", category: "HOMEPAGE",
    desc: "기업 아이덴티티를 스크롤 애니메이션과 현대적인 레이아웃으로 표현한 공식 홈페이지입니다.",
    stack: "Next.js / Tailwind CSS / Minio", period: "2025.11 – 2025.12", icon: Globe, detailId: "project-wizplus",
  },
  {
    id: "04", title: "힐링다이아", category: "MOBILE APP",
    desc: "AI 이미지 변환과 픽셀 드로잉으로 시각적 힐링을 선사하는 보석 컬러링 앱입니다.",
    stack: "React Native / Expo / AdMob", period: "2026.01 – 진행 중", icon: Smartphone, detailId: "project-coloring",
  },
];

export default function Projects() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const items = ref.current?.querySelectorAll(".scroll-anim");
    if (!items) return;
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("visible"); observer.unobserve(e.target); } }),
      { root: document.getElementById("snap-main"), threshold: 0.05 }
    );
    items.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="projects"
      className="snap-start h-screen relative overflow-hidden flex flex-col justify-center px-6 md:px-16 py-16 md:py-20"
    >
      <div
        className="absolute inset-0"
        style={{ backgroundImage: "url('/bg-section.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}
      />

      <div ref={ref} className="relative z-10 max-w-6xl mx-auto w-full flex flex-col gap-8">

        {/* 타이틀 — 배경 위에 바로 */}
        <div>
          <p className="scroll-anim text-xs font-bold tracking-[0.45em] uppercase text-white/70 mb-1">
            03 — Projects
          </p>
          <h2
            className="scroll-anim text-4xl font-bold text-white section-title"
            style={{ transitionDelay: "0.08s" }}
          >
            Projects
          </h2>
        </div>

        {/* 프로젝트 카드 그리드 */}
        <div className="grid grid-cols-2 gap-3 md:gap-4">
          {projects.map((project, i) => {
            const Icon = project.icon;
            const goto = () =>
              window.dispatchEvent(new CustomEvent("scrollToSection", { detail: { id: project.detailId } }));

            const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
              const el = e.currentTarget;
              const rect = el.getBoundingClientRect();
              const x = (e.clientX - rect.left) / rect.width - 0.5;
              const y = (e.clientY - rect.top) / rect.height - 0.5;
              el.style.transition = "transform 0.08s ease, background 0.2s ease";
              el.style.transform = `perspective(700px) rotateX(${-y * 10}deg) rotateY(${x * 10}deg) scale(1.02)`;
            };
            const onEnter = (e: React.MouseEvent<HTMLDivElement>) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.36)";
            };
            const onLeave = (e: React.MouseEvent<HTMLDivElement>) => {
              const el = e.currentTarget;
              el.style.background = "rgba(255,255,255,0.26)";
              el.style.transition = "transform 0.5s ease, background 0.2s ease";
              el.style.transform = "perspective(700px) rotateX(0deg) rotateY(0deg) scale(1)";
            };

            return (
              <div
                key={project.id}
                className="scroll-anim rounded-2xl p-4 md:p-6 flex flex-col gap-2 md:gap-3 cursor-pointer group"
                style={{ ...glass, transitionDelay: `${0.15 + i * 0.1}s` }}
                onClick={goto}
                onMouseMove={onMove}
                onMouseEnter={onEnter}
                onMouseLeave={onLeave}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2.5">
                    <Icon size={20} color="rgba(15,45,130,0.80)" />
                    <span
                      className="text-xs font-bold tracking-wider px-2 py-0.5 rounded"
                      style={{ background: "rgba(60,100,220,0.12)", color: "rgba(30,70,180,0.75)" }}
                    >
                      {project.category}
                    </span>
                  </div>
                  <span className="text-xs font-mono" style={{ color: "rgba(15,45,130,0.40)" }}>{project.id}</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold" style={{ color: "rgba(10,35,110,0.95)" }}>
                    {project.title}
                  </h3>
                  <p className="text-xs mt-1.5 leading-relaxed" style={{ color: "rgba(20,55,140,0.68)" }}>
                    {project.desc}
                  </p>
                </div>
                <div
                  className="flex items-center justify-between mt-auto pt-3"
                  style={{ borderTop: "1px solid rgba(100,140,220,0.25)" }}
                >
                  <span style={badge}>{project.stack}</span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs" style={{ color: "rgba(15,45,130,0.50)" }}>{project.period}</span>
                    <ArrowRight size={13} color="rgba(15,45,130,0.40)" className="group-hover:translate-x-0.5 transition-transform" />
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
