import { useEffect, RefObject } from "react";
import { usePathname } from "next/navigation";

export function useScrollToDetail(
  ref: RefObject<HTMLElement | null>, 
  postId: string | number, 
  isModal: boolean
) {
  const pathname = usePathname();

  useEffect(() => {
    // 💡 활성화 상태(모달)가 아니면 감시하지 않음 🕵️‍♀️
    if (!isModal || !ref.current) return;

    const handleScroll = () => {
      const element = ref.current;
      if (!element) return;

      // 💡 사용자가 150px 이상 내렸을 때 주소 전환 (수치는 조절 가능!)
      if (element.scrollTop > 150) {
        const detailPath = `/post/view/${postId}`;

        // 현재 주소와 다를 때만 실행해서 부하 줄이기 👿
        if (pathname !== detailPath) {
          // 브라우저 히스토리에 기록을 남기지 않고 주소만 교체!
          window.history.replaceState(null, '', detailPath);
        }
      }
    };

    const container = ref.current;
    container.addEventListener("scroll", handleScroll);
    
    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, [isModal, postId, pathname, ref]);
}