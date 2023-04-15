import { useCallback, useMemo } from "react";
import useCurrentUser from "./useCurrentUser"
import useLoginModal from "./useLoginModal";
import usePost from "./usePost";
import usePosts from "./usePosts";
import { toast } from "react-hot-toast";
import axios from "axios";

const useLike= ({postId, userId}:{postId: string, userId?: string})=>
{
    const {data:currentUser}=useCurrentUser();
    const {data:fetcedPost, mutate:mutateFetchedPost}= usePost(postId)
    const{mutate:mutateFetchedPosts}=usePosts(userId)

    const loginModal=useLoginModal();

    const hasLiked=useMemo(()=>{
        const list=fetcedPost?.likedIds || []

        return list.includes(currentUser?.id)
    },[currentUser?.id, fetcedPost?.likedIds]);

    const toggleLike=useCallback(async()=>{
        if(!currentUser){
            return loginModal.onOpen()
        }

        try{
            let request;

            if(hasLiked){
                request=()=>axios.delete(`/api/like/${postId}`);
            }else{
                request=()=>axios.post(`/api/like/${postId}`)
            }

            await request();
            mutateFetchedPosts();
            mutateFetchedPost();

            toast.success("Sent gift")

        }catch(error){
            toast.error("Something went wrong")
        }
    },[
        currentUser,
        hasLiked,
        postId,
        mutateFetchedPost,
        mutateFetchedPost,
        loginModal
]);

return{
    hasLiked,
    toggleLike
}

};

export default useLike;