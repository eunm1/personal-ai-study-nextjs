"use client";

import { useState, useEffect } from "react";
import style from "./page.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import PostCard from "@/componants/post/post-card";
import { PostData } from "@/types/post-types";

export default function DashboardClient({ initialPosts }: { initialPosts: PostData[] }) {
  const [isDesktop, setIsDesktop] = useState(false);

  // 💡 브라우저 크기 체크는 클라이언트에서만 가능!
  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className={style.container}>
      {isDesktop ? (
        <Swiper
          className={style.swiperContainer}
          spaceBetween={20}
          slidesPerView={1}
          centeredSlides={true}
          mousewheel={true}
          pagination={{ clickable: true }}
          modules={[Mousewheel, Pagination]}
        >
          {initialPosts.map((post) => (
            <SwiperSlide key={`desktop-${post.id}`} className={style.swiperSlide}>
              <PostCard  key={`mobile-${post.id}`} {...post} />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <div className={style.verticalGrid}>
          {initialPosts.map((post) => (
            <PostCard key={`mobile-${post.id}`} {...post} />
          ))}
        </div>
      )}
    </div>
  );
}