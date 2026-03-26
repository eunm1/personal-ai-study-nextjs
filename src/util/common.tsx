export async function delay(ms:number) {
    return new Promise((resolve)=>{
        setTimeout(() => {
            resolve("")
        }, ms);
    })
    
}

export function formatDate(dateString: string) {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'short', // '월', '화' 등 요일 표시 (선택)
  }).format(date);
}

export const getOrCreateTempUserId = () => {
  if (typeof window === 'undefined') return '';
  let id = localStorage.getItem('temp_user_id');
  if (!id) {
    id = crypto.randomUUID(); // 💡 브라우저 고유 ID 생성
    localStorage.setItem('temp_user_id', id);
  }
  return id;
};