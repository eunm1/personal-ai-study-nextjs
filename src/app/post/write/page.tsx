"use client";

import ButtonGroup from "@/componants/common/ButtonGroup";
import style from "./page.module.css";
import Button from "@/componants/common/Button"; // 어제 만든 컴포넌트
import { useDevice } from "@/hooks/use-device";
import { useRouter } from "next/navigation";
import { useActionState, useState } from "react";
import SelectGroup from "@/componants/common/SelectGroup";
import AutoResizeTextarea from "@/componants/common/AutoResizeTextarea";
import { createPostAction } from "@/actions/create-post.action";
import { getOrCreateTempUserId } from "@/util/common";
import PostForm from "@/componants/post/post-form";

const oprions = [
  { id: "1", value: 'soft watercolor painting, pastel colors, dreamy atmosphere, artistic texture', label: "차분한 수채화 🥐" , discription: '에세이, 일상 기록, 감성적인 글'},
  { id: "2", value: 'cyberpunk aesthetic, neon lights, night city, futuristic, highly detailed, sharp', label: "사이버펑크 🥖" , discription: 'IT 관련 글, 일기, 강렬한 인상'},
  { id: "3", value: 'flat vector illustration, minimalist, clean lines, modern color palette, simple', label: "미니멀 일러스트 🧈" , discription: '정보 전달, 깔끔한 기술 블로그 느낌'},
  { id: "4", value: 'thick brushstrokes, oil painting, classical art style, rich colors, dramatic lighting', label: "유화(Oil Paint) 🧈" , discription: '무거운 주제, 깊이 있는 생각, 고전적 감성'},
];
  

export default function WritePage() {

  const [state, formAction, isPending] = useActionState(createPostAction, null);

  return (
    <div className={style.pageContainer}>
      <PostForm 
        formAction={formAction}
        isPending={isPending}
        state={state}
      >
      </PostForm>
    </div>
  );
}