import PostListSkeleton from "@/componants/post/skeleton/post-list-skeleton";
import PostCard from "@/componants/post/post-card";
import { PostData } from "@/types/post-types";
// import { delay } from "@/util/delay";
import { Metadata } from "next";
import { Suspense } from "react";
import { delay } from "@/util/common";
import style from '@/app/(with-searchbar)/search/page.module.css'
import PostList from "@/componants/post/post-list";

async function SearchResult({ q }: { q: string }) {
  await delay(3000);
  const searchList: PostData[] = await api.get(`/post/search?q=${q}`,
    { cache: "force-cache" }
  );

  console.log(searchList)
  return (
    <div className={style.container}>
        <PostList searchPostList={searchList} />
    </div>
  );
}

//현재 페이지 메타 데이터를 동적으로 생성하는 역할
export async function generateMetadata({
  searchParams
}:{
  searchParams:Promise<{q?: string}>
}): Promise<Metadata>{
  const { q } = await searchParams;
  return{
    title : `${q} : Daily Post with AI 검색`,
    description : `${q}의 검색 결과입니다`,
    openGraph:{
      title : `${q} : Daily Post with AI 검색`,
      description : `${q}의 검색 결과입니다`,
      images: ['/thumbnail.png']
    }
  }
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{
    q?: string;
  }>
}) {
  return (
    <Suspense
      key={(await searchParams).q || ""}
       fallback={
        <div className={style.container}>
            <PostListSkeleton count={6} />
        </div>
    }>
      <SearchResult q={(await searchParams).q || ""} />
    </Suspense>
  );
}