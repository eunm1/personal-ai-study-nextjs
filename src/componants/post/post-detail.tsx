"use client";
// src/componants/post/post-detail-content.tsx
import { useDevice } from "@/hooks/use-device";
import Button from "@/componants/common/Button";
import { PostData } from "@/types/post-types";
import style from "./post-detail.module.css";
import { formatDate } from "@/util/common";
import { useEffect, useMemo, useRef, useState } from "react";
import { usePageCalculator } from "@/hooks/use-page-calculator";
import { usePostPager } from "@/hooks/use-page-paper";
import { useRouter } from "next/navigation";
import ButtonGroup from "../common/ButtonGroup";
import { usePostDeleteForm } from "@/hooks/use-post-form";
import { deletePostAction } from "@/actions/delete-post.action";

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


  // 수정 페이지로 이동
  const handleNavigate = (e: React.MouseEvent) => {

    router.back();

    e.preventDefault();
    e.stopPropagation();
    
    setTimeout(() => {
      router.push(`/post/edit/${post.id}`);
    }, 100);
  };

  //삭제 form
  const [isPending, setIsPending] = useState(false);
const handleDelete = async () => {
    if (!confirm("정말 삭제하시겠어요? 🌹")) return;
    setIsPending(true); // 로딩 시작

    const formData = new FormData();
    formData.append("id", post.id.toString());

    // 서버 액션을 직접 호출합니다.
    const result = await deletePostAction('', formData);

    if (result?.error) {
      alert(result.error);
    }else{
        if(isModal){
          router.back();
          setTimeout(() => {
            router.push("/");
            router.refresh();
          }, 100);
        } else{
          router.replace("/"); 
          router.refresh();
        }
    }
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
                  <span>{post.analysis?.status}...</span>
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
            >{'<'}</button>
            
            <span className={style.pageNum}>{currentPage + 1} / {pages.length}</span>
            
            <button 
              className={style.pagebutton}
              disabled={currentPage === pages.length - 1} 
              onClick={() => setCurrentPage(p => p + 1)}
            >{'>'}</button>

            {!isMobile && isShow && (
              <ButtonGroup mode="web">
                  <Button variant="blue" mode="web" size="sm" onClick={handleNavigate}>수정하기</Button>
                  <Button variant="red" mode="web" size="sm" onClick={handleDelete} 
                    disabled={isPending}>
                    {isPending ? "삭제 중..." : "삭제하기"}
                  </Button>
              </ButtonGroup>
            ) }
          </div>

          {/* 💡 앱 전용: 일반 세로 스크롤 */}
          <div className={style.mobileContent}>
             <p className={style.diaryText}>{post.content}</p>
              {isMobile && isShow && (
              <footer className={style.mobileFooter}>
                <ButtonGroup mode="app">
                  <Button variant="blue"  size="md" onClick={handleNavigate}>수정하기</Button>
                  {/* 초기데이터가 있으면 or pathname 이 edit이면 삭제하기 버튼 추가 */}
                  <Button variant="red" size="md" onClick={handleDelete} 
                    disabled={isPending}>
                    {isPending ? "삭제 중..." : "삭제하기"}
                  </Button>
                </ButtonGroup>
              </footer>
            )}
          </div>
      </section>
      </div>
    </article>
  );
}