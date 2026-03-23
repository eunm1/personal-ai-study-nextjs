// src/lib/api.ts
const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const customFetch = async (endpoint: string, options?: RequestInit) => {
  console.log(BASE_URL)
  const url = `${BASE_URL}${endpoint}`;
  const defaultOptions: RequestInit = {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  };
  if (!BASE_URL) {
    console.error("❌ 에러: NEXT_PUBLIC_API_URL이 설정되지 않았습니다. .env 파일을 확인하세요.");
  }

  const response = await fetch(url, defaultOptions);
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || '통신 에러 발생');
  }
  return response.json();
};

export const api = {
  get: (url: string, options?: RequestInit) => 
    customFetch(url, { ...options, method: 'GET' }),
    
  post: (url: string, body: any, options?: RequestInit) => 
    customFetch(url, { ...options, method: 'POST', body: JSON.stringify(body) }),
    
  patch: (url: string, body: any, options?: RequestInit) => 
    customFetch(url, { ...options, method: 'PATCH', body: JSON.stringify(body) }),
    
  delete: (url: string, options?: RequestInit) => 
    customFetch(url, { ...options, method: 'DELETE' }),
};