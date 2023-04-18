import { useCallback, useMemo } from "react";
import useCurrentUser from "./useCurrentUser"
import useLoginModal from "./useLoginModal";
import usePost from "./usePost";
import usePosts from "./usePosts";
import { toast } from "react-hot-toast";
import axios from "axios";

const useDelete= ({postId, userId}:{postId: string, userId?: string})=>
{
    const {data:currentUser}=useCurrentUser();
    const {data:fetcedPost, mutate:mutateFetchedPost}= usePost(postId)
    const{mutate:mutateFetchedPosts}=usePosts(userId)

    const loginModal=useLoginModal();

    const isCreator=useMemo(()=>{
        if(fetcedPost?.userId!==currentUser?.id) {
            console.log("You are not the creator of this sweet")
            return
        }
        console.log("fetched post user id and current user",fetcedPost?.userId,currentUser.id);
        

        return (currentUser?.id)
    },[currentUser?.id, fetcedPost?.userId]);

    const toggleDelete=useCallback(async()=>{
        if(!currentUser){
            return loginModal.onOpen()
        }

        try{
            let request;

            if(isCreator){
                request=()=>axios.delete(`/api/edit/${postId}`);
            }else{
                return
            }

            await request();
            mutateFetchedPosts();
            mutateFetchedPost();

            toast.success("Sweet gone")

        }catch(error){
            toast.error("Something went wrong")
        }
    },[
        currentUser,
        isCreator,
        postId,
        mutateFetchedPost,
        mutateFetchedPost,
        loginModal
]);

return{
    isCreator,
    toggleDelete
}

};

export default useDelete;