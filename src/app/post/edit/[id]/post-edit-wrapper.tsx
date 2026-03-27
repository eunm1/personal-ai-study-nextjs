"use client";

import { useState } from "react";
import PostForm from "@/componants/post/post-form";
import { PostData } from "@/types/post-types";
import style from "./page.module.css";
import { useDevice } from "@/hooks/use-device";
import SelectGroup from "@/componants/common/SelectGroup";
import PostDetail from "@/componants/post/post-detail";

const oprions = [
  { id: "1", value: 'true', label: "AI 재요약 & 이미지 재생성"},
];


export default function PostEditFormWrapper({ initialData }: { initialData: PostData }) {
  const { isMobile } = useDevice();

  const [selectedValue, setSelectedValue] = useState<string[]>([]);

  const handleTagChange = (clickedValue: string) => {
    setSelectedValue((prev) => {
      // 1. 이미 선택된 배열에 클릭한 값이 있는지 확인
      if (prev.includes(clickedValue)) {
        // 2. 이미 있다면? 해당 값을 제외한 나머지만 남김 (체크 해제)
        return prev.filter((value) => value !== clickedValue);
      } else {
        // 3. 없다면? 기존 배열에 새로운 값을 추가 (체크 선택)
        return [...prev, clickedValue];
      }
    });
  };

  // 💡 실시간 프리뷰를 위해 전체 데이터를 상태로 관리합니다.
  const [formData, setFormData] = useState<PostData>(initialData);

  // 💡 입력값이 바뀔 때마다 formData를 업데이트하는 함수 (PostForm에 전달 가능)
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  
  return (
    <div className={style.contentWrapper}>
      {/* 📱 앱(모바일) 전용: 상단 이미지 배너 */}
      {isMobile && (
        <div className={style.mobileImageBanner}>
            {initialData.analysis?.imageUrl ? (
            <img src={initialData.analysis?.imageUrl} alt={`preview-${initialData.id}`} />
            ) : (
            <p className="text-gray-400">등록된 이미지가 없습니다. 👿</p>)}
        </div>
      )}

    {/* 💻 웹 전용: 왼쪽 프리뷰 (CSS 미디어쿼리로 조절) */}
      {!isMobile && (
        <aside className={style.desktopPreview}>
          <div className={style.previewTitleBadge}>LIVE PREVIEW</div>
          {/* isModal을 true로 줘서 수정 버튼 등을 숨길 수 있게 조절합니다. */}
          <div className={style.previewScaleWrapper}>
            <PostDetail post={formData} isShow={false}/> 
          </div>
        </aside>
      )}


      {/* 📝 메인 폼 영역 */}
      <div className={style.formArea}>
        <PostForm 
          initialData={initialData}
          onChange={handleInputChange}
        >
          {/* AI 옵션 주입 */}
          <div className={style.fieldGroup}>
          <SelectGroup 
              selectType="checkbox"
              name="reAnalyze_checkbox"
              options={oprions} 
              selectedValue={selectedValue} 
              onChange={handleTagChange} 
            />
            <input 
              type="hidden" 
              name="reAnalyze" 
              value={selectedValue.includes('true') ? 'true' : 'false'} 
            />
        </div>
        </PostForm>
      </div>
    </div>
  );
}