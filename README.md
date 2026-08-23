# 나예진 — 프론트엔드 엔지니어 포트폴리오 웹사이트

Next.js App Router와 Tailwind CSS v4를 활용해 구현한 인터랙티브 포트폴리오 웹사이트입니다. 이력서에 작성된 실무 프로젝트(AI-VIS, POOLIM, WIZplus 공식 브랜드 사이트)의 상세 분석과 기술 스택을 정리했습니다.

## 🔗 Live Demo & Info

- 배포 주소: [nayejin-frontend.vercel.app](https://nayejin-frontend.vercel.app)
- 이메일: nayejin259@gmail.com
- GitHub: [github.com/NaYejin94](https://github.com/NaYejin94)

## ✨ 핵심 인터랙션 및 기술 구현 특징

### 1. 타이핑 애니메이션 히어로 섹션 (Hero.tsx)

여러 문구를 순차적으로 타이핑·삭제하는 효과를 순수 React state와 `setTimeout`으로 구현했습니다. 진입 애니메이션이 끝난 뒤 타이핑이 시작되도록 타이밍을 분리하고, 커서 깜빡임도 별도 인터벌로 처리했습니다.

### 2. 커스텀 관성 스크롤 컨트롤러 (ScrollController.tsx)

`easeInOutSine` 이징 함수를 적용한 스무스 스크롤을 순수 TypeScript로 구현했습니다. 데스크탑에서는 마우스 휠·키보드 방향키·터치 스와이프를 감지해 섹션 단위로 스냅 이동하고, 모바일/태블릿에서는 콘텐츠 높이가 화면보다 커질 수 있다는 점을 고려해 강제 페이징 대신 자연 스크롤 + `scrollIntoView` 기반 내비게이션으로 분기 처리했습니다.

### 3. 프로젝트 카드 인터랙션 (Projects.tsx)

호버 시 테두리 색상·배경·아이콘 이동 등 다단계 트랜지션이 함께 반응하도록 구성했습니다.

### 4. 웹 표준 준수 및 접근성(A11y)

클릭으로 진입하는 프로젝트 카드에 `role="button"`, `tabIndex={0}`을 부여하고, `Enter`/`Space` 키 입력으로도 상세 페이지 진입이 가능하도록 키보드 접근성을 구현했습니다.

### 5. 인쇄 최적화 미디어 쿼리 (globals.css)

인사담당자가 사이트를 인쇄하거나 PDF로 저장할 때를 대비해 `@media print` 쿼리를 작성했습니다. 스크롤 스냅용 고정 높이·overflow 제약을 해제해 콘텐츠가 잘리지 않고 자연스럽게 출력되도록 처리했습니다.

## 🛠️ Tech Stack & Architecture

- **Framework**: Next.js (App Router / Turbopack)
- **Library**: React, TypeScript
- **Styling**: Tailwind CSS v4, Vanilla CSS
- **Icons**: Lucide React
- **Deployment**: Vercel

## 📂 Folder Structure

```
src/
├── app/
│   ├── favicon.ico
│   ├── globals.css         # 글로벌 스타일링, 인쇄 최적화 및 CSS 애니메이션 정의
│   ├── layout.tsx          # 루트 레이아웃
│   └── page.tsx            # 메인 엔트리 및 프로젝트 정적 데이터 바인딩
└── components/
    ├── About.tsx           # 프로필 소개 및 기술 스택 스펙 시트
    ├── Projects.tsx        # 프로젝트 카드 목록 (A11y 대응)
    ├── ProjectDetail.tsx   # 프로젝트별 개요·주요 기능·기술적 도전 상세 페이지
    ├── Hero.tsx             # 타이핑 효과 기반 히어로 섹션
    ├── Contact.tsx          # 연락처 영역
    ├── Navbar.tsx            # 상단 글로벌 내비게이션
    ├── SideNav.tsx           # 우측 플로팅 섹션 도트 내비게이션
    ├── ScrollController.tsx  # 커스텀 관성 스크롤 제어기 (데스크탑 스냅 / 모바일 자연 스크롤)
    ├── CustomCursor.tsx      # 커스텀 커서 (포인터 지원 기기 전용)
    ├── ProgressBar.tsx       # 스크롤 진행률 인디케이터
    ├── BackToTop.tsx         # 상단으로 가기 버튼
    └── RevealTitle.tsx       # 단어별 딜레이 등장 타이틀 컴포넌트
```

## 🚀 Getting Started

```bash
# 의존성 설치
npm install

# 로컬 개발 서버 실행
npm run dev

# 린트 검증
npm run lint

# 프로덕션 빌드
npm run build
```
