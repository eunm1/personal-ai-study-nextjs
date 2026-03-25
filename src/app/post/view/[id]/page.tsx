// [2. 포스트 상세화면] # 상세 페이지 (Server Component로 데이터 fetch)

import PostDetail from "@/componants/post/post-detail";
import { PostData } from "@/types/post-types";
import { Suspense } from "react";

async function PostDetailContent({postId, isModal}:{postId: string; isModal:boolean;}) {
  const response : PostData = await api.get(`/post/${postId}`,
    {cache : "force-cache"}
  );

  return (
    <>
        <PostDetail post={response} isModal={isModal}/>
    </>
  );
}

export default async function Page({ 
  params,
  isModal=false
}: { 
  params: Promise<{ id: string }> ;
  isModal:boolean;
}) {
    console.log("test")
  return (
  <div>
    <Suspense fallback={<div>상세 내용을 읽어오는 중...</div>}>
        {/* 💡 웹/앱 반응형 UI가 담긴 공통 컴포넌트 */}
        <PostDetailContent postId={(await params).id} isModal={isModal}/>
    </Suspense>
  </div>
  );
}