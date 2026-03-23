// src/components/common/SearchBar.tsx
"use client";

import { useEffect, useState } from "react";
import styles from "./SearchBar.module.css";
import { useRouter, useSearchParams } from "next/navigation";

export default function SearchBar() {
  const router = useRouter();

  // 1. 현재 브라우저 주소창에 있는 ?q=검색어를 읽어옵니다. 
  // 페이지를 새로고침해도 검색어가 유지되게 하는 핵심 포인트입니다.
  const searchParams = useSearchParams();
  const q = searchParams.get("q");

  const [search, setSearch] = useState("");
  

  // 2. 주소창의 검색어(q)가 바뀔 때마다 입력창(setSearch)의 글자도 자동으로 업데이트해 줍니다. 
  // (예: 뒤로 가기를 눌렀을 때 입력창 글자도 같이 바뀌게 함)
  useEffect(() => {
    setSearch(q || "");
  }, [q]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // 페이지 새로고침 방지
    onSubmit();
  };

  // 사용자가 타이핑할 때마다 search 상태를 실시간으로 업데이트합니다.
  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const onSubmit = () => {
    // 입력값이 없거나, 이미 현재 검색 중인 단어와 같으면 작동하지 않게 막아줍니다(효율성)
    if (!search || q === search) return; 
    // 페이지를 이동
    router.push(`/search?q=${search}`); 
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    //엔터 키를 눌렀을 때 버튼을 클릭한 것과 똑같이 검색이 되도록
    if (e.key === "Enter") {
      onSubmit();
    }
  };

  return (
    <form onSubmit={handleFormSubmit} className={styles.container}>
      <input
        type="text"
        className={styles.input}
        value={search}
        onChange={onChangeSearch}
        onKeyDown={onKeyDown}
        placeholder="어떤 일기를 찾으시나요?"
      />
      <button type="submit" className={styles.button}>
        검색
      </button>
    </form>
  );
}