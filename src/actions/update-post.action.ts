// src/actions/post.ts
"use server";

import { redirect } from "next/navigation";
import { clearPostCache } from "./clear-post-cach.action";

export async function updatePostAction(prevState: any, formData: FormData) {
console.log(formData)
    // 1. 데이터 추출
  const postId = formData.get("id")?.toString() || "";
  const title = formData.get("title")?.toString() || "";
  const author = formData.get("author")?.toString() || "";
  const style = formData.get("style")?.toString() || "";
  const content = formData.get("content")?.toString() || "";
  const tempUserId = formData.get("tempUserId")?.toString() || "";
  const reAnalyze = formData.get("reAnalyze")?.toString() === "true";

  // 💡 만약 content 안에 진짜 JSON 객체를 넣고 싶다면? (예: 에디터 데이터)
  // const contentObj = JSON.parse(formData.get("content") as string);

  // 2. 간단한 유효성 검사
  if (!title || !content || !author ) {
    return { error: "모든 필드를 입력해주세요." };
  }

  try {
    // 3. DB 저장 로직 (예: Supabase, Prisma 등)
    // await db.post.create({ data: { title, author, style, content } });
    await api.patch(`/post/${postId}`,{
      title,
      content,
      author,
      style,
      tempUserId,
      reAnalyze
    });

    console.log("저장될 데이터:", { title, author, style, content });
    await clearPostCache('/')

  } catch (e) {
    return { error: "저장 중 오류가 발생했습니다." };
  }

  // 4. 성공 시 이동
  redirect("/");
}