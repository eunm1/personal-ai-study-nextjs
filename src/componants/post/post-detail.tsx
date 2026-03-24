"use client";
// src/componants/post/post-detail-content.tsx
import { useDevice } from "@/hooks/useDevice";
import Button from "@/componants/common/Button";
import { PostData } from "@/types/post-types";
import style from "./post-detail.module.css";
import { formatDate } from "@/util/common";
import { useMemo, useRef, useState } from "react";
import { usePageCalculator } from "@/hooks/use-page-calculator";

export default function PostDetail({ post , isModal=false}: { post: PostData , isModal:boolean}) {

  const { isMobile } = useDevice();
  
  // 💡 텍스트가 담길 영역을 참조합니다.
  const contentRef = useRef<HTMLDivElement>(null);
  const [currentPage, setCurrentPage] = useState(0);

  // 💡 훅 실행: 영역 크기에 따른 '적정 글자 수'를 가져옵니다.
  const charsPerPage = usePageCalculator(contentRef);

  // 💡 글자 수(charsPerPage)가 바뀔 때마다 본문을 다시 나눕니다.
  const pages = useMemo(() => {
    if (!post.content || charsPerPage <= 0) return ["내용이 없습니다."];

  const result = [];
  const lines = post.content.split("\n"); // 1. 일단 엔터 기준으로 나눔
  
  // 💡 훅에서 계산된 '한 줄당 글자 수'와 '페이지당 줄 수'를 활용
  // (훅에서 이 값들을 반환하도록 수정하거나, 아래처럼 대략적으로 계산)
  const fontSize = 15;
  const lineHeight = 1.9;
  const charsPerLine = Math.floor(contentRef.current?.clientWidth! / (fontSize * 0.7)) || 40;
  const maxLinesPerPage = Math.floor(contentRef.current?.clientHeight! / (fontSize * lineHeight)) || 12;

  let currentContent = "";
  let currentLineCount = 0;

  for (const line of lines) {
    // 2. 한 줄이 너무 길어 자동 줄바꿈되는 경우를 계산 (글자 수 / 한 줄당 글자 수)
    const visualLines = Math.max(1, Math.ceil(line.length / charsPerLine));

    // 3. 현재 페이지에 이 줄을 넣었을 때 maxLines를 넘는지 확인
    if (currentLineCount + visualLines > maxLinesPerPage) {
      if (currentContent) result.push(currentContent.trim());
      currentContent = line + "\n";
      currentLineCount = visualLines;
    } else {
      currentContent += line + "\n";
      currentLineCount += visualLines;
    }
  }

  if (currentContent) result.push(currentContent.trim());
    return result;
  }, [post.content, charsPerPage]);
    
  return (
    <article className={style.wrapper}>
      <div className={style.contentGrid}>
        {/* 1. 왼쪽(웹)/상단(앱): AI 이미지 영역 */}
        <section className={style.imageSection}>
          {/* <img 
            src={post.analysis?.imageUrl || "/default-ai.png"} 
            alt="AI 분석 이미지" 
            className={style.aiImage} 
          /> */}
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

            {!isMobile && (
              <Button variant="blue" mode="web">수정</Button>
            )}
          </div>

          {/* 💡 앱 전용: 일반 세로 스크롤 */}
          <div className={style.mobileContent}>
             <p className={style.diaryText}>{post.content}</p>
          </div>
          {isMobile && !isModal && (
          <footer className={style.mobileFooter}>
            <Button variant="blue" mode="app">수정하기</Button>
          </footer>
        )}
      </section>
      </div>
    </article>
  );
}