import PostCardSkeleton from "./post-card-skeleton";


export default function BookListSkeleton({
    count,
}:{count: number;}){
    return new Array(count).fill(0).map((item, idx)=>(
        <PostCardSkeleton key={`post-card-skeleton-${idx}`}/>
    )); 
}