import PostEditFormWrapper from "./post-edit-wrapper";
import style from "./page.module.css";
import { PostData } from "@/types/post-types";

export default async function EditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  // 💡 상세 페이지(PostDetail)와 똑같은 방식으로 서버에서 데이터 fetch!
  const response: PostData = await api.get(`/post/${id}`, {
    cache: "no-store", // 수정 페이지니까 최신 데이터를 가져와야겠죠? 👿
  });

  return (
    <div className={style.pageContainer}>
      {/* 💡 데이터를 클라이언트 컴포넌트로 넘겨줍니다. */}
      <PostEditFormWrapper initialData={response} />
    </div>
  );
}