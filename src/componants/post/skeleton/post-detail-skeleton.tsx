import style from "./post-detail-skeleton.module.css";

export default function PostDetailSkeleton() {
  return (
    <article className={style.wrapper}>
      <div className={style.contentGrid}>
        
        {/* 1. AI 이미지 영역 - skeleton 클래스 추가! */}
        <section className={`${style.imageSection} ${style.skeleton}`}>
        </section>

        {/* 2. 텍스트 영역 */}
        <section className={style.contentSection}>
          <header className={style.header}>
            {/* 제목 스켈레톤 👿 */}
            <div className={`${style.title} ${style.skeleton}`}></div>
            <div className={`${style.meta} ${style.skeleton}`}></div>
          </header>

          <div className={style.pageContentArea}>
            {/* 텍스트 줄 여러 개 배치 🕵️‍♀️ */}
            <div className={`${style.diaryText} ${style.skeleton}`}></div>
            <div className={`${style.diaryText} ${style.skeleton}`}></div>
            <div className={`${style.diaryText} ${style.skeleton}`}></div>
            <div className={`${style.diaryText} ${style.skeleton}`} style={{width: '60%'}}></div>
          </div>

          <div className={`${style.pageNavigation} ${style.skeleton}`}>
          </div>
        </section>
        
      </div>
    </article>
  );
}