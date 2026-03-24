import { PostData } from "@/types/post-types";
import Link from "next/link";
import style from "./post-card.module.css";
import Image from "next/image";
import { formatDate } from "@/util/common";

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
    return( 
    <Link href={`/post/${id}`} className={`${style.card}`}>
        <div 
        className={style.imagePlaceholder} 
        style={{ 
            backgroundImage: analysis?.imageUrl ? `url("${analysis.imageUrl}")` : 'none' 
        }}
        >
            <span className={style.statusBadge}>{analysis?.status == 'COMPLETED' ? 'AI 완료' : '생성중'}</span>
            {analysis?.imageUrl ? (
            <img 
                src={analysis.imageUrl} 
                alt={title} 
                className={style.cardImage}
            />
            ) : (
            <div className={style.placeholder}>
                <span>이미지 생성 중...</span>
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