import Form from "@/components/Form";
import Header from "@/components/Header";
import CommentFeed from "@/components/posts/CommentFeed";
import PostItem from "@/components/posts/PostItem";
import usePost from "@/hooks/usePost";
import { useRouter } from "next/router";
import { ClipLoader } from "react-spinners";

const PostView = () => {
const router= useRouter()
const {postId}=router.query;

const {data:fetchedPost, isLoading}=usePost(postId as string)

if(isLoading || !fetchedPost){
    return(
        <div className="flex justify-center items-center h-full">
            <ClipLoader color="red" size={80}/>
        </div>
    )
}
console.log(fetchedPost, "THIS IS IT");


    return ( 
    <>
    <Header label="Sweet" showBackArrow/>
    <PostItem data={fetchedPost}/>
    <Form
    postId={postId as string}
    isComment
    placeholder="Something sweet to say?"
    />
    <CommentFeed
    comments={fetchedPost?.comments}
    />
    </>);
}
 
export default PostView;