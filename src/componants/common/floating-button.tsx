"use client";

import { usePathname, useRouter } from "next/navigation";
import style from "./floating.module.css";
import Link from "next/link";

export default function FloatingButton() {
  const pathname = usePathname();
  const router = useRouter();

  if (pathname.startsWith("/post/write")) return null;
  if (pathname.startsWith("/post/edit")) return null;

  const handleNavigate = (e: React.MouseEvent) => {
    // 1. 뒤로 가는 모든 신호를 원천 봉쇄
    e.preventDefault();
    e.stopPropagation();
    
    // 2. 이동은 내가 직접 시킨다!
    router.push("/post/write");
  };
  
  return (
    <button 
      className={style.fab}
      onMouseDown={(e) => {
        e.stopPropagation(); // 💡 마우스를 누르는 순간 전파 차단!
      }}
      onClick={handleNavigate} 
    >
      +
    </button>
  );
}