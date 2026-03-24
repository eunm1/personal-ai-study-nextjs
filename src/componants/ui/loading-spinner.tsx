// src/app/(with-searchbar)/loading.tsx
import style from "./loading.module.css";
/**loading.tsx라는 파일명은 Next.js가 **"해당 경로 전체"**에 자동으로 적용하는 특수 예약어 */
export default function Loading() {
  return (
    <div className={style.overlay}>
      <div className={style.spinner}></div>
      <p className={style.text}>데이터를 불러오고 있습니다...</p>
    </div>
  );
}