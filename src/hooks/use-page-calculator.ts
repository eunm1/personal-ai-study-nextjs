"use client";

import { useState, useEffect, RefObject } from "react";

export function usePageCalculator(ref: RefObject<HTMLElement | null>) {
  const [charsPerPage, setCharsPerPage] = useState(500); // 기본값

  useEffect(() => {
    if (!ref.current) return;

    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width, height } = entry.contentRect;

        // 💡 디자인 설정값 (CSS와 맞춰주세요)
        const fontSize = 15; 
        const lineHeight = 1.8; // 💡 CSS의 line-height와 일치시키기
        // 💡 실제 텍스트가 차지하는 '한 줄의 높이'
        const oneLineHeight = fontSize * lineHeight;

        // 💡 페이지당 줄 수 계산 (Math.floor로 꽉 채우되, 0.5줄 정도의 여유를 뺌)
        // (height - 5) 처럼 약간의 버퍼를 주면 하단 잘림이 사라집니다.
        const linesPerPage = Math.floor((height - 5) / oneLineHeight);

        // 💡 한 줄당 글자 수 (한글 기준 좀 더 넉넉하게 0.7)
        const charsPerLine = Math.floor(width / (fontSize * 0.7));

        // 최종 글자 수
        const totalChars = charsPerLine * linesPerPage;

        setCharsPerPage(totalChars > 0 ? totalChars : 500);
      }
    });

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref]);

  return charsPerPage;
}