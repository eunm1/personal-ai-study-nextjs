// 💡 use client를 쓰지 않습니다 (기본적으로 Server Component)
import { Suspense } from "react";
import DashboardClient from "./DashboardClient";
import { delay } from "@/util/delay";
import Loading from "@/componants/ui/loading-spinner";

export const dynamic = "force-dynamic";

// 1. 서버에서 데이터를 미리 가져옵니다. (SEO에 좋고 보안상 안전함)
async function PostListContainer() {
    await delay(1200); //페이지 suspence 테스트용
  const posts = await api.get(`/post`,
    // {next: { revalidate: 3 }}
);
    // 2. 가져온 데이터를 클라이언트 컴포넌트에 'Props'로 넘겨줍니다.
  return <>
    <DashboardClient initialPosts={posts}/>
  </>;
}


export default async function DashboardPage() {
    //todo 스켈레톤으로 변경
  return <Suspense fallback={<Loading/>}> 
    <PostListContainer />
  </Suspense>;
}