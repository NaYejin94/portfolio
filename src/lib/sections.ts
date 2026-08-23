// 스크롤 스냅으로 실제 이동하는 물리적 섹션 순서 (프로젝트당 개요/기술적 도전 2페이지)
export const SECTIONS = [
  "hero",
  "about",
  "projects",
  "project-aivis",
  "project-aivis-challenges",
  "project-poolim",
  "project-poolim-challenges",
  "project-wizplus",
  "project-wizplus-challenges",
  "contact",
] as const;

// "-challenges" 페이지를 같은 프로젝트의 대표(개요) id로 묶어서 네비게이션 dot/active 표시에 사용
export function dotGroupId(sectionId: string): string {
  return sectionId.endsWith("-challenges") ? sectionId.replace(/-challenges$/, "") : sectionId;
}
