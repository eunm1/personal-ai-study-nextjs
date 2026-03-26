"use client";
// src/componants/post/post-detail-content.tsx
import { useDevice } from "@/hooks/use-device";
import Button from "@/componants/common/Button";
import { PostData } from "@/types/post-types";
import style from "./post-detail.module.css";
import { formatDate } from "@/util/common";
import { useMemo, useRef, useState } from "react";
import { usePageCalculator } from "@/hooks/use-page-calculator";
import { usePostPager } from "@/hooks/use-page-paper";
import { useRouter } from "next/navigation";

export default function PostDetail({ post , isModal=false, isShow=true}: { post: PostData , isModal?:boolean, isShow?:boolean}) {
  const router = useRouter();
  
  const { isMobile } = useDevice();
  
  // 💡 텍스트가 담길 영역을 참조합니다.
  const contentRef = useRef<HTMLDivElement>(null);
  const [currentPage, setCurrentPage] = useState(0);

  // 💡 훅 실행: 영역 크기에 따른 '적정 글자 수'를 가져옵니다.
  const charsPerPage = usePageCalculator(contentRef);

  // 💡 글자 수(charsPerPage)가 바뀔 때마다 본문을 다시 나눕니다.
  const pages = usePostPager(post.content, charsPerPage, contentRef);

  const handleNavigate = (e: React.MouseEvent) => {

    router.back();

    e.preventDefault();
    e.stopPropagation();
    
    setTimeout(() => {
      router.push(`/post/edit/${post.id}`);
    }, 100);
  };
  
    
  return (
    <article className={style.wrapper}>
      <div className={style.contentGrid}>
        {/* 1. 왼쪽(웹)/상단(앱): AI 이미지 영역 */}
        <section className={style.imageSection}>
          {post.analysis?.imageUrl ? (
              <img 
                  src={post.analysis.imageUrl} 
                  alt={post.title} 
                  className={style.aiImage}
              />
              ) : (
              <div className={style.placeholder}>
                  <span>이미지 생성 중...</span>
              </div>
              )}
        </section>

      {/* 2. 오른쪽(웹)/하단(앱): 텍스트 영역 */}
      <section className={style.contentSection}>
        <header className={style.header}>
          {post.category && (
            <span className={style.categoryTag}>
              #{post.category.name}
            </span>
          )}
          <h1 className={style.title}>{post.title}</h1>
          <div className={style.meta}>
            <span>{post.author}</span>
            <span>{formatDate(post.createdAt)}</span>
          </div>
        </header>

          {/* 💡 이 영역(ref)의 크기를 훅이 감시합니다! */}
          <div className={style.pageContentArea} ref={contentRef}>
            <p className={style.diaryText}>
              {pages[currentPage] || pages[0]}
            </p>
          </div>

          <div className={style.pageNavigation}>
            <button 
              className={style.pagebutton}
              disabled={currentPage === 0} 
              onClick={() => setCurrentPage(p => p - 1)}
            >이전</button>
            
            <span className={style.pageNum}>{currentPage + 1} / {pages.length}</span>
            
            <button 
              className={style.pagebutton}
              disabled={currentPage === pages.length - 1} 
              onClick={() => setCurrentPage(p => p + 1)}
            >다음</button>

            {!isMobile && isShow && (
              <Button variant="blue" mode="web" onClick={handleNavigate}>수정하기</Button>
            )}
          </div>

          {/* 💡 앱 전용: 일반 세로 스크롤 */}
          <div className={style.mobileContent}>
             <p className={style.diaryText}>{post.content}</p>
          </div>
          {isMobile && !isModal && isShow && (
          <footer className={style.mobileFooter}>
            <Button variant="blue" mode="app" onClick={handleNavigate}>수정하기</Button>
          </footer>
        )}
      </section>
      </div>
    </article>
  );
}