import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "나예진 | Frontend Developer Portfolio",
  description: "React / Next.js / TypeScript 프론트엔드 개발자 나예진의 포트폴리오",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full">
      <head>
        <link rel="preconnect" href="https://cdn.jsdelivr.net" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
        />
      </head>
      <body className="h-full overflow-hidden">{children}</body>
    </html>
  );
}
