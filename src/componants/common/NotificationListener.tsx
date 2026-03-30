"use client";

import { useEffect } from 'react';
import { toast } from 'sonner';
import { usePathname, useRouter } from 'next/navigation';
import { clearPostCache } from '@/actions/clear-post-cach.action';
import { useProgressStore } from '@/hooks/use-progress-store';

export default function NotificationListener() {
  const router = useRouter();

  const pathname = usePathname();

  useEffect(() => {
    // 💡 TODO: 나중에 localStorage에서 temp_user_id 가져와서 연결할 주소
    const tempUserId = localStorage.getItem('temp_user_id');
    if (!tempUserId) return;
    const eventSource = new EventSource(`${process.env.NEXT_PUBLIC_API_URL}/notifications/sse/${tempUserId}`);

    console.log("tempUserId",tempUserId);
    eventSource.onmessage = async(event) => {
        const data = JSON.parse(event.data);
        const targetPath = `/post/view/${data.postId}`; // 💡 이동해야 할 목적지
        
        if (data.status === 'FAILED') {
            toast.error("AI 분석 중 오류가 발생했습니다.", {
            description: "잠시 후 다시 시도하거나 관리자에게 문의해주세요. 😢",
            action: {
                label: "다시 시도",
                onClick: () => router.push(`/post/edit/${data.postId}`) // 수정 페이지로 보내기
            }
            });

        }else if(data.status === 'COMPLETED'){
            await clearPostCache('/');
            // await clearPostCache(`/post/view/${data.postId}`);
            
            toast.success("AI 분석 완료!", {
              duration: 5000, // 5초간 유지 (너무 빨리 사라지지 않게!)
              description: "작품이 완성되었습니다. 🎨",
              // 💡 현재 경로가 목적지와 다를 때만 "확인하기" 버튼 노출
              action: pathname !== targetPath ? {
                label: "확인하기",
                onClick: () => router.push(targetPath),
              } : undefined, 
            });
      
              // 데이터를 최신화함
              router.refresh();
        }else{
          useProgressStore.getState().setProgress(data.postId, {
            status: data.status,
            message: data.message,
            percent: data.percent || 0
          });
        }
    };

    eventSource.onerror = () => {
      eventSource.close();
    };

    return () => eventSource.close();
    
  }, [pathname, router]); // 💡 pathname이 바뀔 때마다 리스너가 최신 경로를 알 수 있게 추가

  return null; // 화면에 그릴 건 없고 로직만 수행
}