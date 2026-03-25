import "./globals.css";
import style from "./layout.module.css";
import Link from "next/link";
import { api } from '@/lib/api';
import FloatingButton from "@/componants/common/floating-button";

if (!globalThis.api) {
  globalThis.api = api;
}

// 전역 레이아웃

export default function RootLayout({
  children,
  modal
}: Readonly<{
  children: React.ReactNode;
  modal : React.ReactNode;
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
              {modal}
          <div id="modal-root"></div>
          </main>
          <footer className={style.footer}>제작 @eunm1</footer>
          <FloatingButton />
      </body>
    </html>
  );
}
