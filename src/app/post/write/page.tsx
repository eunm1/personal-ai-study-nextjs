"use client";

import ButtonGroup from "@/componants/common/ButtonGroup";
import style from "./page.module.css";
import Button from "@/componants/common/Button"; // 어제 만든 컴포넌트
import { useDevice } from "@/hooks/use-device";
import { useRouter } from "next/navigation";
import { useActionState, useState } from "react";
import SelectGroup from "@/componants/common/SelectGroup";
import AutoResizeTextarea from "@/componants/common/AutoResizeTextarea";
import { createReviewAction } from "@/actions/create-post.action";

const oprions = [
  { id: "1", value: 'soft watercolor painting, pastel colors, dreamy atmosphere, artistic texture', label: "차분한 수채화 🥐" , discription: '에세이, 일상 기록, 감성적인 글'},
  { id: "2", value: 'cyberpunk aesthetic, neon lights, night city, futuristic, highly detailed, sharp', label: "사이버펑크 🥖" , discription: 'IT 관련 글, 일기, 강렬한 인상'},
  { id: "3", value: 'flat vector illustration, minimalist, clean lines, modern color palette, simple', label: "미니멀 일러스트 🧈" , discription: '정보 전달, 깔끔한 기술 블로그 느낌'},
  { id: "4", value: 'thick brushstrokes, oil painting, classical art style, rich colors, dramatic lighting', label: "유화(Oil Paint) 🧈" , discription: '무거운 주제, 깊이 있는 생각, 고전적 감성'},
];
  

export default function WritePage() {

  const [state, formAction, isPending] = useActionState(createReviewAction, null);

  // 이미지 스타일 선택 상태 관리
  const [selectedValue, setSelectedValue] = useState("");

  // 콘텐츠 작성
  const [content, setContent] = useState("");

  const { isMobile } = useDevice();

  return (
    <div className={style.pageContainer}>
      <form action={formAction}>
      {/* 1. 상단 액션 바 (웹: 상단 / 앱: 하단 고정) */}
      <ButtonGroup mode={isMobile ? "app" : "web"}>
        <Button variant="gray" size={isMobile ? "md" : "sm"}>취소</Button>
        <Button variant="blue" size={isMobile ? "md" : "sm"} type="submit" disabled={isPending}>
          {isPending ? "저장 중..." : "저장하기"}
        </Button>
      </ButtonGroup>

        {/* 2. 제목 (가장 크게, 테두리 없이 하단 선만) */}
        <input className={style.titleInput} name="title" placeholder="제목을 입력하세요" />

        {/* 3. 💡 작성자 & 비밀번호 */}
        <div className={style.authorInfo}>

            <input className={style.infoInput} name="author" placeholder="작성자" />


            {/* 💡 비밀번호는 오른쪽 끝에 붙임 */}
            <input type="password" className={style.infoInput} name="password" placeholder="비밀번호"/>

        </div>

        {/* 4. 💡 이미지 스타일 (체크박스 3개) */}
        <div className={style.fieldGroup}>
          <label className={style.label}>이미지 스타일</label>
          <SelectGroup 
              selectType="checkbox"
              name="style"
              options={oprions} 
              selectedValue={selectedValue} 
              onChange={setSelectedValue} 
            />
        </div>

        {/* 5. 본문 (스크롤 없이 쭉 늘어나는 구조) : Auto-expanding Textarea*/}
        <AutoResizeTextarea 
          name="content"
          value={content} 
          onChange={setContent} 
          placeholder="글을 작성해주세요..." 
        />
        {/* 서버 에러 메시지 표시 */}
        {state?.error && <p className={style.error}>{state.error}</p>}
      </form>
    </div>
  );
}