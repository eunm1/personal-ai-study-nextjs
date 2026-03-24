import { ReactNode, Suspense } from "react";
import Searchbar from "@/componants/common/SearchBar";
import style from "./page.module.css";
import Loading from "@/componants/ui/loading-spinner";
import PostCardSkeleton from "@/componants/post/skeleton/post-card-skeleton";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className={style.layoutContainer}>
      <Searchbar />
      {children}
    </div>
  );
}
