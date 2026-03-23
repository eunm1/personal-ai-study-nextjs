import { ReactNode, Suspense } from "react";
import Searchbar from "@/componants/common/SearchBar";
import styles from "./page.module.css";
import Loading from "@/componants/ui/loading-spinner";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className={styles.layoutContainer}>
      <Suspense fallback={<Loading />}>
        <Searchbar />
      </Suspense>
      {children}
    </div>
  );
}
