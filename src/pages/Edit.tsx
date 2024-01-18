import {useParams} from "react-router-dom";
import PostForm from "./PostForm";

const Edit = () => {
    const { postId } = useParams<{ postId: string }>();

    return <PostForm postId={postId} isEditMode />;
};