// src/hooks/use-post-pager.ts
import { useMemo } from "react";

export function usePostPager(content: string, charsPerPage: number, contentRef: React.RefObject<HTMLDivElement | null>) {
  return useMemo(() => {
    if (!content || charsPerPage <= 0) return ["내용이 없습니다."];

    const result = [];
    const lines = content.split("\n");
    
    // 💡 계산에 필요한 설정값들
    const fontSize = 15;
    const lineHeight = 1.9;
    const charsPerLine = Math.floor(contentRef.current?.clientWidth! / (fontSize * 0.7)) || 40;
    const maxLinesPerPage = Math.floor(contentRef.current?.clientHeight! / (fontSize * lineHeight)) || 12;

    let currentContent = "";
    let currentLineCount = 0;

    for (const line of lines) {
      const visualLines = Math.max(1, Math.ceil(line.length / charsPerLine));

      if (currentLineCount + visualLines > maxLinesPerPage) {
        if (currentContent) result.push(currentContent.trim());
        currentContent = line + "\n";
        currentLineCount = visualLines;
      } else {
        currentContent += line + "\n";
        currentLineCount += visualLines;
      }
    }

    if (currentContent) result.push(currentContent.trim());
    return result;
  }, [content, charsPerPage, contentRef]);
}