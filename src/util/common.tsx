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