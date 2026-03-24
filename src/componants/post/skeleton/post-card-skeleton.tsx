import style from "./post-card-skeleton.module.css";

export default function PostCardSkeleton(){
    return (
    <div className={style.card}>
        <div className={style.imagePlaceholder}></div>
        <div className={style.cardContent}>
            <div className={style.title}></div>
            <div className={style.summary}></div>
            <div className={style.meta}></div>
        </div>
    </div>
    );
}