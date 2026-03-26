import "./globals.css";
import style from "./layout.module.css";
import Link from "next/link";
import { api } from '@/lib/api';
import FloatingButton from "@/componants/common/floating-button";
import { Toaster } from "sonner";
import NotificationListener from "@/componants/common/NotificationListener";

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
          <NotificationListener /> {/* 💡 알림 리스너 추가 */}
          
          {/* 💡 최하단에 Toaster 배치 (모든 페이지에서 알림을 띄울 준비 완료) */}
          <Toaster 
            position="bottom-center" // 알림 위치
            richColors              // 성공/실패 색상 적용
            closeButton             // 닫기 버튼 표시
            expand={true} // 💡 여러 알림이 올 때 겹치지 않고 펼쳐보여줌
            visibleToasts={3} // 동시에 보여줄 개수
            toastOptions={{
              style: { 
                zIndex: 9999, // 👈 여기가 핵심! 모달(보통 1000~2000)보다 높게!
              },
            }}
          />
      </body>
    </html>
  );
}
