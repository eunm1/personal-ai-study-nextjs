import { PostData } from "@/types/post-types";
import Link from "next/link";
import styles from "./post-card.module.css";
import Image from "next/image";

/* 구조분해 할당을 이용하여 타입 설정하는 법 */
export default function MovieCard({
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
    <Link href={`/post/${id}`} className={`${styles.card}`}>
        <div 
        className={styles.imagePlaceholder} 
        style={{ 
            backgroundImage: analysis?.imageUrl ? `url("${analysis.imageUrl}")` : 'none' 
        }}
        >
            <span className={styles.statusBadge}>{analysis?.status == 'COMPLETED' ? 'AI 완료' : '생성중'}</span>
            {analysis?.imageUrl ? (
            <img 
                src={analysis.imageUrl} 
                alt={title} 
                className={styles.cardImage}
            />
            ) : (
            <div className={styles.placeholder}>
                <span>이미지 생성 중...</span>
            </div>
            )}
        </div>
        <div className={styles.cardContent}>
            <h3 className={styles.title}>{title}</h3>
            <p className={styles.summary}>{analysis?.summary}</p>
            <div className={styles.meta}>
            <span>{author}</span>
            <span>{createdAt}</span>
            </div>
        </div>
    </Link>
    );
}