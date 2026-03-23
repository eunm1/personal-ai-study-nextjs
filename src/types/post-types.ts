export interface PostAnalysis {
  style: string;          // 생성될 이미지 스타일 (예: "cartoon", "oil-painting")
  summary: number;        // 일기 요약 번호 또는 짧은 요약 데이터
  tempImageUrl?: string;  // 생성 중 보여줄 임시 이미지 (Preview용)
  imageUrl?: string;      // 최종 확정된 AI 이미지 URL
  // 💡 상태값이 5단계로 세분화되었네요! 아주 좋습니다.
  status: 'PENDING' | 'ANALYZING' | 'GENERATING' | 'COMPLETED' | 'FAILED'; 
}

export interface Category {
  name: string;           // 일기 카테고리 (예: "일상", "여행")
}

export interface PostData {
  id: number;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  analysis?: PostAnalysis; // AI 분석 데이터 (Optional)
  category?: Category;     // 카테고리 정보 (Optional)
}