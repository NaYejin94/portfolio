import Navbar from "@/components/Navbar";
import SideNav from "@/components/SideNav";
import ThemeToggle from "@/components/ThemeToggle";
import ScrollController from "@/components/ScrollController";
import ProgressBar from "@/components/ProgressBar";
import BackToTop from "@/components/BackToTop";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import { ProjectOverview, ProjectChallenges, type ProjectData } from "@/components/ProjectDetail";
import Contact from "@/components/Contact";

const projectsData: ProjectData[] = [
  {
    id: "01",
    sectionId: "project-aivis",
    title: "AI-VIS",
    subtitle: "지자체 전광판 AI 영상 송출 플랫폼",
    summary: "지자체 전광판의 영상 송출과 스케줄링을 자동화하는 AI 기반 통합 제어 플랫폼입니다.",
    period: "2025.10 – 2025.12",
    role: "Frontend Developer",
    stack: ["Next.js", "TypeScript", "Zustand", "React Query", "Kubb", "SSE", "dnd-kit"],
    images: ["/screenshots/aivis-1.png", "/screenshots/aivis-2.png"],
    features: [
      "AI 생성 영상 콘텐츠 관리 대시보드 구현",
      "커스텀 SSE 클라이언트로 영상 생성 진행률 실시간 스트리밍 (네트워크 단절 시 자동 재연결)",
      "영상 스케줄 등록 및 재생목록 관리",
      "JWT 자동 갱신 + 동시 401 요청 큐잉 인증 로직 구현",
      "사용자 역할(VIEWER 등)에 따른 메뉴·기능 노출 제어",
    ],
    challenges: [
      {
        title: "SSE 연결 안정성 확보",
        desc: "네트워크 단절 시 자동 재연결과 지수 백오프를 적용해 서버 부하를 최소화하면서도 안정적인 실시간 스트리밍을 유지했습니다.",
      },
      {
        title: "Kubb API 타입 자동화",
        desc: "OpenAPI 스펙 fetch와 Kubb 코드 재생성 스크립트를 연동해 API 타입 불일치를 제거하고, 백엔드 API 스펙이 미확정인 상태에서도 병렬 개발이 가능하도록 했습니다.",
      },
      {
        title: "재생목록 드래그 정렬 UX",
        desc: "dnd-kit(키보드 센서 포함)으로 재생목록 순서 변경 기능을 구현하고, optimistic update를 적용해 서버 응답 전에도 즉각적인 피드백을 제공했습니다.",
      },
    ],
    icon: "monitor",
  },
  {
    id: "02",
    sectionId: "project-poolim",
    title: "POOLIM",
    subtitle: "선거 컨설팅 AI SaaS",
    summary: "선거 데이터를 정밀 분석하여 승리 전략과 캠페인 예산을 제안하는 AI 컨설팅 솔루션입니다.",
    period: "2025.12 – 2026.07",
    role: "Frontend Developer",
    stack: ["Next.js", "TypeScript", "Recharts", "네이버 지도 API"],
    images: ["/screenshots/poolim-1.png", "/screenshots/poolim-2.png"],
    features: [
      "다차원 선거 데이터 시각화 — Recharts 커스텀 차트와 GeoJSON 기반 지역 히트맵(네이버 지도 API)을 연동, 지역별 '기회지수(gap_index)'를 4단계로 색상 코딩해 직관적으로 표현",
      "유권자 군집 분석 — 지역별 클러스터 라벨·전략 데이터를 지도 폴리곤과 연결해 클릭 시 상세 통계 팝업 제공",
      "*.poolim.kr 서브도메인 요청을 후보자별 홈페이지로 rewrite하는 멀티테넌트 라우팅 (Next.js Middleware)",
      "구독 등급별(Free/Basic/Pro) 기능 단위 접근 제어 — 기능별 개별 가드 + 등급에 따라 블러 처리·업그레이드 모달 차등 노출",
      "선거법 AI 챗봇 — 서버 발급 세션 ID를 localStorage에 저장해 재방문 시 대화 이력 유지, 세션 만료·요청 제한 시 사용자 안내 처리",
      "SSE 기반 실시간 알림·AI 응답 스트리밍 UI 구현",
      "주간/일간 리포트 자동 생성 및 PDF 다운로드 기능"
    ],
    challenges: [
      {
        title: "지도-통계 데이터 교차 시각화",
        desc: "GeoJSON 폴리곤 좌표에서 지역 중심점을 직접 계산하고, 기회지수(gap_index) 임계값에 따라 4단계 색상을 매핑해 지도 위에 표현했습니다. Recharts 차트와 네이버 지도 히트맵을 함께 구성해 통계 데이터와 공간 데이터를 한 화면에서 교차 분석할 수 있도록 했습니다.",
      },
      {
        title: "서브도메인 멀티테넌트 라우팅",
        desc: "Next.js Middleware로 *.poolim.kr 서브도메인 요청을 후보자별 홈페이지 경로로 rewrite하는 구조를 구현했습니다.",
      },
      {
        title: "구독 등급별 접근 제어 UX",
        desc: "기능 단위(추천, 리포트, 메시지 등)로 개별 가드를 두고 비구독·Basic·Pro 등급에 따라 블러 처리와 업그레이드 모달을 다르게 노출했습니다. useSyncExternalStore로 서버/클라이언트 렌더링 결과 불일치를 방지해, 로그인 상태에 따라 화면이 깜빡이는 문제를 막았습니다.",
      },
    ],
    icon: "trending",
  },
  {
    id: "03",
    sectionId: "project-wizplus",
    title: "WIZplus 홈페이지",
    subtitle: "기업 홈페이지 풀스택 구현",
    summary: "기업 아이덴티티를 스크롤 애니메이션과 현대적인 레이아웃으로 표현한 공식 홈페이지입니다.",
    period: "2025.11 – 2026.03",
    role: "Fullstack Developer (기획·디자인·개발)",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Minio"],
    images: ["/screenshots/wizplus.png"],
    features: [
      "Figma 디자인 직접 제작 후 구현",
      "IntersectionObserver 기반 스크롤 연동 섹션 등장 애니메이션",
      "Minio 오브젝트 스토리지 기반 포트폴리오 영상 조회·재생 API 구현",
      "카테고리 필터, 호버 시 자동재생·구간 이동, 로드 실패 폴백을 갖춘 포트폴리오 갤러리 UI 구현",
      "반응형 레이아웃 완성",
    ],
    challenges: [
      {
        title: "Minio 스토리지 연동",
        desc: "회사 포트폴리오를 지속적으로 게시해야 하는 요구사항에 따라 S3 호환 API로 영상·이미지를 조회하고 서명 URL로 접근 권한을 제어했습니다.",
      },
      {
        title: "스크롤 애니메이션 성능",
        desc: "IntersectionObserver와 CSS transition을 조합해 reflow 없이 부드러운 섹션 등장 애니메이션을 구현했습니다.",
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
      <ProgressBar />
      <BackToTop />
      <ThemeToggle />
      <Navbar />
      <SideNav />
      <ScrollController />
      <main id="snap-main" className="h-screen overflow-hidden">
        <Hero />
        <About />
        <Projects />
        {projectsData.map((data, i) => [
          <ProjectOverview key={`${data.id}-overview`} data={data} index={i} />,
          <ProjectChallenges key={`${data.id}-challenges`} data={data} index={i} />,
        ])}
        <Contact />
      </main>
    </>
  );
}
