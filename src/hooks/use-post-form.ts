import { useActionState, useEffect } from "react";
import { createPostAction } from "@/actions/create-post.action";
import { updatePostAction } from "@/actions/update-post.action";
import { deletePostAction } from "@/actions/delete-post.action"; // 💡 삭제 액션 임포트
import { PostData } from "@/types/post-types";

export function usePostForm(initialData?: PostData) {
  // 1. 생성 vs 수정 액션 선택 👿
  const activeAction = initialData?.id ? updatePostAction : createPostAction;
  const [state, formAction, isPending] = useActionState(activeAction, null);

  useEffect(() => {
    if (state?.error) {
      alert(`오류 발생: ${state.error} 👿`);
    }
    
  }, [state]);

  return {
    state,
    formAction,
    isPending,
    isEdit: !!initialData?.id,
  };
}

export function usePostDeleteForm() {
  // 1. 생성 vs 수정 액션 선택 👿

  const [state, formAction, isPending] = useActionState(deletePostAction, null);

  useEffect(() => {
    if (state?.error) {
      alert(`오류 발생: ${state.error} 👿`);
    }
  }, [state]);

  return {
    state,
    formAction,
    isPending
  };
}