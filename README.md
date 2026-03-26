
## 개발환경 세팅 과정
npx create-next-app@latest post-analysis-web
```
Need to install the following packages:
create-next-app@16.2.1
Ok to proceed? (y)
√ Would you like to use the recommended Next.js defaults? » No, customize settings
√ Would you like to use TypeScript? ... Yes
√ Which linter would you like to use? » ESLint
√ Would you like to use React Compiler? ... No
√ Would you like to use Tailwind CSS? ... Yes
√ Would you like your code inside a `src/` directory? ... Yes
√ Would you like to use App Router? (recommended) ... Yes
√ Would you like to customize the import alias (`@/*` by default)? ... Yes
√ What import alias would you like configured? ... @/*
√ Would you like to include AGENTS.md to guide coding agents to write up-to-date Next.js code? ... No 
```

## custom fetch
1. .env 에 서버 경로 작성
2. src>lib>api.ts 생성 (기본 동작 정의 : api.get(url, { next: { revalidate: 3600 } }))
3. 매번 import 안하고 전역으로 사용하는 방법
-- ai --
매 페이지마다 import 하는 게 번거롭다면, TypeScript의 Global 선언을 이용해 브라우저의 window 객체나 global 환경에 등록할 수 있습니다. 하지만 Next.js(SSR 환경)에서는 window가 서버에 없으므로 **globalThis**를 활용하는 것이 정석입니다.
--------
- Step 1: 전역 타입 정의 (src/types/global.d.ts)
- Step 2: 초기화 설정 (src/app/layout.tsx)
```
// src/app/layout.tsx
import { api } from '@/lib/api';

if (!globalThis.api) {
  globalThis.api = api;
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
```
- step 3 사용 예시
```
const handleUpdate = async (id: number) => {
  const result = await api.patch(`/post/${id}`, { 
    content: '수정된 포스트 내용입니다.' 
  });
  console.log('수정 완료:', result);
}
```

------------------------
## 설치 라이브러리 
1. npm install swiper

2. npm install sonner //toast 
- RootLayout에 작성