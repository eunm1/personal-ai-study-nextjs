"use client";

import { useState, useEffect } from "react";
import styles from "./page.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import PostCard from "@/componants/posts/post-card";
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
    <div className={styles.container}>
      {isDesktop ? (
        <Swiper
          className={styles.swiperContainer}
          spaceBetween={20}
          slidesPerView={1}
          centeredSlides={true}
          mousewheel={true}
          pagination={{ clickable: true }}
          modules={[Mousewheel, Pagination]}
        >
          {initialPosts.map((post) => (
            <SwiperSlide key={`desktop-${post.id}`} className={styles.swiperSlide}>
              <PostCard {...post} />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <div className={styles.verticalGrid}>
          {initialPosts.map((post) => (
            <PostCard key={`mobile-${post.id}`} {...post} />
          ))}
        </div>
      )}
    </div>
  );
}