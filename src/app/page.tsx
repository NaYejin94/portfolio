import Navbar from "@/components/Navbar";
import SideNav from "@/components/SideNav";
import ScrollController from "@/components/ScrollController";
import ProgressBar from "@/components/ProgressBar";
import BackToTop from "@/components/BackToTop";
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
    stack: ["Next.js", "TypeScript", "Zustand", "React Query", "Kubb", "SSE"],
    images: ["/screenshots/aivis-1.png", "/screenshots/aivis-2.png"],
    features: [
      "AI 생성 영상 콘텐츠 관리 대시보드 구현",
      "SSE 기반 실시간 전광판 상태 모니터링",
      "영상 스케줄 등록 및 우선순위 관리",
      "다중 전광판 동시 제어 및 일괄 업데이트",
      "관리자 권한별 접근 제어 (RBAC)",
    ],
    challenges: [
      {
        title: "SSE 연결 안정성 확보",
        desc: "네트워크 단절 시 자동 재연결 + 지수 백오프를 적용해 서버 부하를 최소화했습니다.",
      },
      {
        title: "Kubb API 타입 자동화",
        desc: "OpenAPI 스펙 기반 Kubb 코드 생성으로 API 타입 불일치를 제거하고 생산성을 높였습니다.",
      },
      {
        title: "대용량 영상 업로드 UX",
        desc: "청크 분할 업로드와 실시간 진행률 표시로 대용량 파일도 사용자 친화적으로 처리했습니다.",
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
    stack: ["Next.js", "TypeScript", "Recharts", "Leaflet", "SSE", "Toss Payments"],
    images: ["/screenshots/poolim-1.png", "/screenshots/poolim-2.png"],
    features: [
      "지역별 선거 통계 인터랙티브 시각화 (Recharts)",
      "선거구 히트맵 인터랙티브 지도 (Leaflet)",
      "AI 분석 결과 실시간 스트리밍 (SSE)",
      "구독 요금제 결제 연동 (Toss Payments)",
      "선거법 AI 챗봇 (세션 관리·스트리밍 응답)",
    ],
    challenges: [
      {
        title: "복잡한 선거 데이터 시각화",
        desc: "다차원 통계를 Recharts 커스텀 차트로 구성하고 Leaflet 히트맵과 연동해 직관성을 높였습니다.",
      },
      {
        title: "Leaflet + Next.js SSR 충돌",
        desc: "브라우저 전용 라이브러리를 dynamic import로 클라이언트 렌더링을 강제해 해결했습니다.",
      },
      {
        title: "AI 응답 스트리밍 처리",
        desc: "SSE 이벤트를 청크 단위로 파싱해 타이핑 효과와 함께 실시간으로 화면에 표시했습니다.",
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
      "스크롤 연동 애니메이션 (헤더 색상 전환, 섹션 등장)",
      "Minio 기반 영상·이미지 업로드 및 관리",
      "관리자 CMS — 콘텐츠 등록·수정·삭제",
      "반응형 레이아웃 완성",
    ],
    challenges: [
      {
        title: "Minio 스토리지 연동",
        desc: "S3 호환 API로 영상·이미지를 저장하고 서명 URL로 접근 권한을 제어했습니다.",
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
  {
    id: "04",
    sectionId: "project-coloring",
    title: "힐링다이아",
    subtitle: "보석 컬러링 React Native 앱 (개인작)",
    period: "2026.01 – 진행 중",
    role: "기획 + 디자인 + 개발 (1인)",
    stack: ["React Native", "Expo", "TypeScript", "AsyncStorage", "AdMob"],
    images: ["/screenshots/coloring.png"],
    isMobile: true,
    features: [
      "AI 이미지 → 픽셀 그리드 변환 구현 (WebView + Canvas API)",
      "타일 기반 모자이크, 드래그 채우기, 줌인/줌아웃",
      "AdMob 광고 연동 (배너·전면·보상형)",
      "포인트 적립 및 일일 퀘스트 시스템",
      "Google Play 출시 준비 중",
    ],
    challenges: [
      {
        title: "픽셀 드로잉 성능 최적화",
        desc: "수백 개 셀 동시 렌더링 시 발생하는 성능 저하를 React.memo와 useMemo로 해결했습니다.",
      },
      {
        title: "WebView + Canvas 브릿지",
        desc: "React Native ↔ WebView 간 메시지 브릿지로 이미지 처리 결과를 앱 상태에 실시간 반영했습니다.",
      },
      {
        title: "AdMob 플랫폼 분기",
        desc: "iOS·Android 각각의 광고 ID를 Platform.OS로 분기해 정책 위반 없이 수익화를 구현했습니다.",
      },
    ],
    icon: "smartphone",
  },
];

export default function Home() {
  return (
    <>
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
