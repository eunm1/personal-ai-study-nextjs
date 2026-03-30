import { PostData } from "@/types/post-types";
import Link from "next/link";
import style from "./post-card.module.css";
import Image from "next/image";
import { formatDate } from "@/util/common";
import { useProgressStore } from "@/hooks/use-progress-store";

/* 구조분해 할당을 이용하여 타입 설정하는 법 */
export default function PostCard({
    id,
    title,
    content,
    author,
    createdAt,
    updatedAt,
    userId,
    analysis,
    category,
}:PostData){

    // 💡 내 postId에 맞는 진행 상태만 쏙 골라오기!
    const progress = useProgressStore((state) => state.progressMap[id]);
    // 현재 이미지가 없고, Zustand에 진행 데이터가 있다면 '진짜 생성 중'인 상태
    const isActuallyGenerating = !analysis?.imageUrl && progress;

    return( 
    <Link href={`/post/view/${id}`} className={`${style.card}`}>
        <div 
        className={style.imagePlaceholder} 
        style={{ 
            backgroundImage: analysis?.imageUrl ? `url("${analysis.imageUrl}")` : 'none' 
        }}
        >
            <span className={style.statusBadge}>{analysis?.status == 'COMPLETED' ? 'AI 완료' : analysis?.status == 'FAILED' ? '실패' : '생성중'}</span>
            {analysis?.imageUrl ? (
            <img 
                src={analysis.imageUrl} 
                alt={title} 
                className={style.cardImage}
            />
            ) : (
            <div className={style.loadingContainer}>
                {isActuallyGenerating ? (
                    <>
                        {/* 🔵 단계별 스텝 바 */}
                    <div className={style.stepWrapper}>
                    {/* 1단계: 분석 (ANALYZING) */}
                    <div className={`${style.stepCircle} ${
                        progress.status === 'ANALYZING' ? style.stepCurrent : 
                        (progress.percent > 30 ? style.stepActive : '')
                    }`} />
                    
                    {/* 2단계: 생성 (GENERATING) */}
                    <div className={`${style.stepCircle} ${
                        progress.status === 'GENERATING' ? style.stepCurrent : 
                        (progress.percent > 70 ? style.stepActive : '')
                    }`} />
                    
                    {/* 3단계: 완료 직전 (UPLOADING) */}
                    <div className={`${style.stepCircle} ${
                        progress.status === 'COMPLETED' ? style.stepCurrent : ''
                    }`} />
                    </div>
                    </>
                ) : (
                    <span className={style.loadingText}>이미지 생성 중...</span>
                )}
            </div>
            )}
        </div>
        <div className={style.cardContent}>
            <h3 className={style.title}>{title}</h3>
            <p className={style.summary}>{analysis?.summary}</p>
            <div className={style.meta}>
            <span>{author}</span>
            <span>{formatDate(createdAt)}</span>
            </div>
        </div>
    </Link>
    );
}