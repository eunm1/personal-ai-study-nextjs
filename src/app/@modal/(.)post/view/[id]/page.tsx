import PostPage from "@/app/post/view/[id]/page";
import Modal from "@/componants/common/modal/detail-modal";

interface Props {
  params: Promise<{ id: string }>;
}

export default function Page({ params }: Props){
    return (
        <Modal params={params}>
            <PostPage params={params} isModal={true}/>
        </Modal>
    )
}