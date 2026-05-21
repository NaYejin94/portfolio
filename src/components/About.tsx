"use client";

import { useEffect, useRef } from "react";

const techStack = [
  { label: "FRONTEND", items: ["React", "Next.js", "TypeScript", "Tailwind CSS"] },
  { label: "STATE", items: ["Zustand", "React Query"] },
  { label: "MOBILE", items: ["React Native", "Expo"] },
  { label: "TOOLS", items: ["Figma", "Kubb", "Git"] },
  { label: "ETC", items: ["SSE", "Toss Payments", "AdMob", "Minio"] },
];

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
  padding: "3px 12px",
  borderRadius: "999px",
  fontSize: "0.75rem",
  fontWeight: 600,
};

export default function About() {
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
      id="about"
      className="snap-start h-screen relative overflow-hidden flex flex-col justify-center px-6 md:px-16 py-16 md:py-20"
    >
      {/* 배경 이미지 — 오버레이 없음 */}
      <div
        className="absolute inset-0"
        style={{ backgroundImage: "url('/bg-section.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}
      />

      <div ref={ref} className="relative z-10 max-w-6xl mx-auto w-full flex flex-col gap-8">

        {/* 타이틀 — 배경 위에 바로 */}
        <div>
          <p className="scroll-anim text-xs font-bold tracking-[0.45em] uppercase text-white/70 mb-1">
            02 — About
          </p>
          <h2
            className="scroll-anim text-4xl font-bold text-white section-title"
            style={{ transitionDelay: "0.08s" }}
          >
            About Me
          </h2>
        </div>

        {/* 컨텐츠 — 각각 유리 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">

          {/* 소개 카드 */}
          <div
            className="scroll-anim rounded-2xl p-6 md:p-8 flex flex-col gap-4"
            style={{ ...glass, transitionDelay: "0.18s" }}
          >
            <p className="text-xl md:text-2xl font-bold leading-snug" style={{ color: "rgba(15,40,120,0.95)" }}>
              프론트엔드 실무와<br />서비스 기획 경험을 바탕으로<br />
              <span style={{ color: "rgba(30,80,200,0.90)" }}>기술과 사용자 경험</span> 모두를<br />고민하는 개발자입니다.
            </p>
            <hr style={{ borderColor: "rgba(100,140,220,0.25)" }} />
            <div className="flex flex-col gap-2.5">
              <p className="text-sm leading-relaxed" style={{ color: "rgba(20,50,130,0.80)" }}>
                기획·디자인·개발·배포까지 전 과정을 혼자 경험하며{" "}
                <span className="font-semibold" style={{ color: "rgba(15,40,120,0.95)" }}>서비스 전체를 보는 시각</span>을 키워왔습니다.
              </p>
              <p className="text-sm leading-relaxed" style={{ color: "rgba(20,50,130,0.80)" }}>
                실제로 쓰이는 서비스, 사용자가 편리하게 느끼는 인터페이스를 만드는 데 집중합니다.
              </p>
              <p className="text-sm leading-relaxed" style={{ color: "rgba(20,50,130,0.80)" }}>
                팀과 함께 더 큰 프로덕트를 만들어가는 개발자로 성장하고 싶습니다.
              </p>
            </div>
          </div>

          {/* 기술 스택 카드 */}
          <div
            className="scroll-anim rounded-2xl p-6 md:p-8"
            style={{ ...glass, transitionDelay: "0.30s" }}
          >
            <p className="text-xs font-bold tracking-widest uppercase mb-4" style={{ color: "rgba(30,60,140,0.70)" }}>Tech Stack</p>
            <div className="flex flex-col gap-3">
              {techStack.map(({ label, items }) => (
                <div key={label} className="flex items-start gap-4">
                  <span
                    className="text-xs font-bold tracking-widest shrink-0 w-20 pt-0.5"
                    style={{ color: "rgba(30,60,140,0.50)" }}
                  >
                    {label}
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {items.map((item) => (
                      <span key={item} style={badge}>{item}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
