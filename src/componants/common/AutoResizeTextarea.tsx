// src/components/post/AutoResizeTextarea.tsx
"use client";
import { useRef, useEffect } from "react";
import style from "./auto-resize-textarea.module.css"; 

export default function AutoResizeTextarea({ name, value, onChange, placeholder }: any) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleResizeHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; // 높이 초기화
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // 내용만큼 높이 설정
    }
  };

  useEffect(() => {
    handleResizeHeight();
  }, [value]);

  return (
    <textarea
      name={name}
      ref={textareaRef}
      className={style.contentArea}
      value={value}
      onChange={(e) => {
        onChange(e.target.value);
        handleResizeHeight();
      }}
      placeholder={placeholder}
      rows={1} // 💡 시작은 한 줄부터
    />
  );
}