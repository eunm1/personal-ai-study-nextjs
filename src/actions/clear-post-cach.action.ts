'use server'
import { revalidatePath, revalidateTag } from 'next/cache'

export async function clearPostCache(postUrl: string) {
  // 특정 게시글 페이지의 캐시를 완전히 날려버립니다.
  revalidatePath(postUrl);
}