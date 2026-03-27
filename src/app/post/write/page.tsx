
import style from "./page.module.css";
import PostForm from "@/componants/post/post-form";

export default function WritePage() {
  return (
    <div className={style.pageContainer}>
      <PostForm >
      </PostForm>
    </div>
  );
}