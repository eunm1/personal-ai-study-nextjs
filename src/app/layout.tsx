import "./globals.css";
import style from "./layout.module.css";
import Link from "next/link";
import { api } from '@/lib/api';

if (!globalThis.api) {
  globalThis.api = api;
}

// 전역 레이아웃

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={style.container}>
          <header className={style.header}>
            {/* 🔍 정렬을 위한 컨테이너 추가 */}
            <div className={style.headerContent}>
              <Link href="/" className={style.logo}>
                Daily Post with AI
              </Link>
            </div>
          </header>
          <main className={style.main}>
              {children}
          </main>
          <button className={style.fab}>+</button>
          <footer className={style.footer}>제작 @eunm1</footer>
      </body>
    </html>
  );
}
