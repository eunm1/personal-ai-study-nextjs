import PostPage from "@/app/post/[id]/page";
import Modal from "@/componants/modal/modal";

interface Props {
  params: Promise<{ id: string }>;
}

export default function Page({ params }: Props){
    return (
        <Modal params={params}>
            <PostPage params={params} />
        </Modal>
    )
}