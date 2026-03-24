import { PostData } from "@/types/post-types";
import Link from "next/link";
import style from "./post-list.module.css";
import Image from "next/image";
import { formatDate } from "@/util/common";

/** 검색결과 - post 목록형 */
export default function PostList({ searchPostList }: { searchPostList: PostData[] }){
    return( 
        <>
        {
            searchPostList.map((post) => (
                <Link href={`/post/${post.id}`} key={`search-post-${post.id}`} className={`${style.card}`}>
                <div 
                className={style.imagePlaceholder} 
                >
                    {post.analysis?.imageUrl ? (
                    <img 
                        src={post.analysis.imageUrl} 
                        alt={post.title} 
                        className={style.cardImage}
                    />
                    ) : (
                    <div className={style.placeholder}>
                        <span>이미지 생성 중...</span>
                    </div>
                    )}
                </div>
                <div className={style.cardContent}>
                    <h3 className={style.title}>{post.title}</h3>
                    <p className={style.summary}>{post.analysis?.summary}</p>
                    <div className={style.meta}>
                    <span>{post.author}</span>
                    <span>{formatDate(post.createdAt)}</span>
                    </div>
                </div>
            </Link>
            ))}
        </>
    );
}