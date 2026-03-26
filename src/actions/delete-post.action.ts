// src/actions/post.ts
"use server";

import { redirect } from "next/navigation";
import { clearPostCache } from "./clear-post-cach.action";

export async function deletePostAction(prevState: any, formData: FormData) {
    console.log(formData)
    // 1. 데이터 추출
  const postId = formData.get("id")?.toString() || "";

  try {
    // 3. DB 저장 로직 (예: Supabase, Prisma 등)
    // await db.post.create({ data: { title, author, style, content } });
    await api.delete(`/post/${postId}`);

    console.log(`${postId} 삭제`);
    await clearPostCache('/')

  } catch (e) {
    return { error: "저장 중 오류가 발생했습니다." };
  }

  // 4. 성공 시 이동
  redirect("/");
}