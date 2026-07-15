# 🖥️ 나예진 — 프론트엔드 엔지니어 포트폴리오 웹사이트

> **Next.js App Router와 최신 Tailwind CSS v4를 활용해 구현한 하이엔드 인터랙티브 포트폴리오 웹사이트입니다.**
> 이력서에 작성된 실무 프로젝트(`AI-VIS`, `POOLIM`, `WIZplus 공식 브랜드 사이트`) 상세 분석 내용 및 기술 스택을 감각적인 대시보드 형태로 구성했습니다.

---

## 🔗 Live Demo & Info
* **배포 주소:** [nayejinportfolio.vercel.app](https://nayejinportfolio.vercel.app) (또는 Vercel 배포 도메인)
* **이력서 메일:** [nayejin259@gmail.com](mailto:nayejin259@gmail.com)
* **깃허브:** [github.com/NaYejin94](https://github.com/NaYejin94)

---

## ✨ 핵심 인터랙션 및 기술 구현 특징

### 1. 🍱 벤토 그리드(Bento Grid) 대시보드 레이아웃 (`About.tsx`)
* 요즘 가장 트렌디한 테크 기업 및 개발자들이 차용하는 바둑판 모양의 그리드 대시보드를 구축했습니다.
* **프로필 바이오 카드:** 현재 구직 상태를 동적으로 알려주는 **실시간 펄싱 핑(Pinging) 효과**가 적용된 구직 상태 배지를 통합했습니다.
* **기술 스택 가시화:** 핵심 기술 스택을 대분류 카테고리(Frontend, State, Tools, Etc)별로 그라디언트 글래스모피즘(Glassmorphism) 배지 형태로 보여줍니다.
* **비주얼 다이어그램:** 이력서의 "API 자동화(Kubb)" 경험을 직관적으로 보여주기 위한 **CSS 아키텍처 다이어그램 흐름**을 미니멀하게 내장하여 시각적 즐거움과 정보 전달력을 동시에 극대화했습니다.

### 2. 🎡 가속 물리 기반 스무스 스크롤 컨트롤러 (`ScrollController.tsx`)
* 일반 브라우저의 딱딱한 스크롤 스냅을 넘어, 삼각함수 감쇠(`easeInOutSine`) 수식을 적용한 **가속도 물리 기반 스무스 스크롤러**를 순수 TypeScript로 구현했습니다.
* 마우스 휠, 키보드 방향키(`ArrowUp`/`ArrowDown`/`PageUp`/`PageDown`), 모바일 스와이프 터치 이벤트를 인터셉트하여 일정한 속도와 관성으로 섹션을 스냅 롤링합니다.

### 3. 💎 3D 카드 패럴랙스 틸트 & 마우스 라이팅 셰이더 (`Projects.tsx`)
* 3D 라이브러리(Three.js 등) 없이, 순수 CSS의 `perspective`와 `rotateX`/`rotateY` 변환을 활용해 카드 위에 마우스를 올렸을 때 **원근감 있게 반응하는 3D Card Hover** 효과를 구현했습니다.
* 마우스 커서의 좌표 오프셋을 실시간 계산하여 카드의 표면에 윤기가 흐르는 듯한 **래디얼 그라디언트 스포트라이트(Spotlight) 반사 효과**를 수식으로 맵핑했습니다.

### 4. ♿ 웹 표준 준수 및 접근성(A11y) 고도화
* 단순 마우스 클릭만 허용하는 `div` 블록 형태의 프로젝트 진입 영역에 `role="button"` 및 `tabIndex={0}` 표준 마크업을 바인딩했습니다.
* 마우스 없이 키보드 **Tab** 키 탐색만으로 카드 포커싱이 가능하게 하고, **Enter** 혹은 **Space** 키 입력을 감지해 상세 페이지로 자연스럽게 라우팅되도록 키보드 접근성 인터랙션을 구현했습니다.

### 5. 🖨️ 인쇄 및 PDF 다운로드 최적화 미디어 쿼리 (`globals.css`)
* Vercel 배포 주소로 접속한 인사담당자가 해당 웹사이트를 그대로 인쇄하거나 PDF 파일로 내보낼 때, 레이아웃이 지저분하게 흩어지지 않도록 `@media print` 쿼리를 꼼꼼히 설계했습니다.
* 네비게이션바 등 불필요한 고정 인터페이스는 인쇄 대상에서 제외하고, **각각의 섹션이 A4 용지 규격 안에서 한 페이지씩 완벽히 인쇄(Page break)되도록 레이아웃 강제 노출 처리를 수행**했습니다.

---

## 🛠️ Tech Stack & Architecture

* **Framework:** Next.js 16 (App Router / Turbopack)
* **Library:** React 19, TypeScript
* **Styling:** Tailwind CSS v4, Vanilla CSS
* **Icons:** Lucide React
* **Deployment:** Vercel

---

## 📂 Folder Structure

```text
src/
├── app/
│   ├── favicon.ico
│   ├── globals.css         # 글로벌 스타일링, 인쇄 최적화 및 CSS 애니메이션 정의
│   ├── layout.tsx          # 루트 레이아웃
│   └── page.tsx            # 메인 엔트리 및 프로젝트 정적 데이터 바인딩
└── components/
    ├── About.tsx           # [핵심] 벤토 그리드 기반 프로필 대시보드
    ├── Projects.tsx        # [핵심] 3D 마우스 틸트 인터랙티브 프로젝트 갤러리 (A11y 최적화)
    ├── ProjectDetail.tsx   # 프로젝트별 역할, 상세 스펙 및 트러블 슈팅 분석 템플릿
    ├── Hero.tsx            # 타이핑 효과 및 패럴랙스 히어로 섹션 (Lint 버그 수정 완료)
    ├── Contact.tsx         # 감사 인사 및 다이렉트 컨택트 영역
    ├── Navbar.tsx          # 상단 글로벌 네비게이션바
    ├── SideNav.tsx         # 우측 플로팅 섹션 도트 네비게이션
    ├── ScrollController.tsx# [핵심] 커스텀 관성 스무스 스크롤 제어기
    ├── CustomCursor.tsx    # 커서 트래킹 전용 포인터 컴포넌트
    ├── ProgressBar.tsx     # 스크롤 진행률 인디케이터
    ├── BackToTop.tsx       # 상단으로 가기 컴포넌트
    └── RevealTitle.tsx     # 단어별 딜레이 디졸브 등장 컴포넌트
```

---

## 🚀 Getting Started

로컬 환경에서 프로젝트를 실행하고 테스트하는 방법입니다.

1. 의존성 패키지 설치:
   ```bash
   npm install
   ```

2. 로컬 개발 서버 실행:
   ```bash
   npm run dev
   ```

3. 정적 빌드 및 린트 검증:
   ```bash
   npm run lint
   npm run build
   ```
