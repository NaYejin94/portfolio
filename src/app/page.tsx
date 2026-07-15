import Navbar from "@/components/Navbar";
import SideNav from "@/components/SideNav";
import ScrollController from "@/components/ScrollController";
import ProgressBar from "@/components/ProgressBar";
import BackToTop from "@/components/BackToTop";
import CustomCursor from "@/components/CustomCursor";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import ProjectDetail, { type ProjectData } from "@/components/ProjectDetail";
import Contact from "@/components/Contact";

const projectsData: ProjectData[] = [
  {
    id: "01",
    sectionId: "project-aivis",
    title: "AI-VIS",
    subtitle: "지자체 전광판 AI 영상 송출 플랫폼",
    period: "2025.10 – 2025.12",
    role: "Frontend Developer",
    stack: ["Next.js", "TypeScript", "Zustand", "React Query", "Kubb", "SSE", "dnd-kit"],
    images: ["/screenshots/aivis-1.png", "/screenshots/aivis-2.png"],
    features: [
      "AI 생성 영상 콘텐츠 관리 대시보드 구현",
      "커스텀 SSE 클라이언트로 영상 생성 진행률 실시간 스트리밍 (자동 재연결)",
      "영상 스케줄 등록 및 재생목록 관리",
      "JWT 자동 갱신 + 동시 401 요청 큐잉 인증 로직 구현",
      "사용자 역할(VIEWER 등)에 따른 메뉴·기능 노출 제어",
    ],
    challenges: [
      {
        title: "SSE 연결 안정성 확보",
        desc: "네트워크 단절 시 자동 재연결 + 지수 백오프를 적용해 서버 부하를 최소화했습니다.",
      },
      {
        title: "Kubb API 타입 자동화",
        desc: "OpenAPI 스펙 fetch + Kubb 코드 재생성 스크립트로 API 타입 불일치를 제거하고, API 미확정 상태에서도 병렬 개발이 가능하도록 했습니다.",
      },
      {
        title: "재생목록 드래그 정렬 UX",
        desc: "dnd-kit(키보드 센서 포함)으로 재생목록 순서 변경 시 optimistic update를 적용해 즉각적인 피드백을 제공했습니다.",
      },
    ],
    icon: "monitor",
  },
  {
    id: "02",
    sectionId: "project-poolim",
    title: "POOLIM",
    subtitle: "선거 컨설팅 AI SaaS",
    period: "2025.12 – 진행 중",
    role: "Frontend Developer",
    stack: ["Next.js", "TypeScript", "Recharts", "네이버 지도 API"],
    images: ["/screenshots/poolim-1.png", "/screenshots/poolim-2.png"],
    features: [
      "지역별 선거 통계 인터랙티브 시각화 (Recharts)",
      "지역 히트맵 (네이버 지도 API) 및 유권자 군집 분석 API 연동",
      "*.poolim.kr 서브도메인 요청을 후보자별 홈페이지로 rewrite하는 멀티테넌트 라우팅 (Next.js Middleware)",
      "구독 요금제(Free/Basic/Pro) 기반 접근 제어 — API 플랜 정보로 조건부 렌더링·라우트 가드",
      "선거법 AI 챗봇 — 비로그인 포함 게스트 세션(localStorage) 관리, 만료 시 자동 재발급",
    ],
    challenges: [
      {
        title: "복잡한 선거 데이터 시각화",
        desc: "다차원 통계를 Recharts 커스텀 차트로 구성하고 네이버 지도 API 히트맵과 연동해 직관성을 높였습니다.",
      },
      {
        title: "지도 API + Next.js SSR 충돌",
        desc: "브라우저 전용 라이브러리를 dynamic import로 클라이언트 렌더링을 강제해 해결했습니다.",
      },
      {
        title: "서브도메인 멀티테넌트 라우팅",
        desc: "Next.js Middleware로 *.poolim.kr 서브도메인 요청을 후보자별 홈페이지 경로로 rewrite하는 구조를 구현했습니다.",
      },
    ],
    icon: "trending",
  },
  {
    id: "03",
    sectionId: "project-wizplus",
    title: "WIZplus 홈페이지",
    subtitle: "기업 홈페이지 풀스택 구현",
    period: "2025.11 – 2025.12",
    role: "Fullstack Developer (기획·디자인·개발)",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Minio"],
    images: ["/screenshots/wizplus.png"],
    features: [
      "Figma 디자인 직접 제작 후 구현",
      "IntersectionObserver 기반 스크롤 연동 섹션 등장 애니메이션",
      "Minio 오브젝트 스토리지 기반 포트폴리오 영상 조회·재생 API 구현",
      "MinIO 포트폴리오 갤러리 UI — 카테고리 필터, 호버 시 자동재생·구간 이동, 로드 실패 폴백",
      "반응형 레이아웃 완성",
    ],
    challenges: [
      {
        title: "Minio 스토리지 연동",
        desc: "회사 포트폴리오를 지속적으로 게시해야 하는 요구사항에 따라 S3 호환 API로 영상·이미지를 조회하고 서명 URL로 접근 권한을 제어했습니다.",
      },
      {
        title: "스크롤 애니메이션 성능",
        desc: "IntersectionObserver와 CSS transition을 조합해 reflow 없이 부드러운 등장 애니메이션을 구현했습니다.",
      },
      {
        title: "기획부터 배포까지 1인 진행",
        desc: "Figma 와이어프레임 → 디자인 → 개발 → 배포 전 과정을 단독으로 수행하며 서비스 전체 흐름을 경험했습니다.",
      },
    ],
    icon: "globe",
  },
];

export default function Home() {
  return (
    <>
      <CustomCursor />
      <ProgressBar />
      <BackToTop />
      <Navbar />
      <SideNav />
      <ScrollController />
      <main id="snap-main" className="h-screen overflow-hidden">
        <Hero />
        <About />
        <Projects />
        {projectsData.map((data, i) => (
          <ProjectDetail key={data.id} data={data} index={i} />
        ))}
        <Contact />
      </main>
    </>
  );
}
