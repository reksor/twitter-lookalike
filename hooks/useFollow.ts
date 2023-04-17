import axios from "axios";

import { toast } from "react-hot-toast";
import { useCallback, useMemo } from "react";
import useCurrentUser from "./useCurrentUser"
import useLoginModal from "./useLoginModal";
import useUser from "./useUser";

const useFollow = (userId: string)=>{
    const {data:currentUser, mutate:mutateCurrentUser}=useCurrentUser();
    const {mutate: mutateFetchedUser}= useUser(userId);

    const loginModal=useLoginModal();

    const isFollowing=useMemo(()=>{
        const list=currentUser?.followingIds || [];

        return list.includes(userId);
    },[userId,currentUser]);

    const toggleFollow = useCallback(async()=>{
        if(!currentUser){
            return loginModal.onOpen()
        }

        try{
            await axios[isFollowing ? 'delete':'post'](`/api/follow/${userId}`)
            mutateCurrentUser();
            mutateFetchedUser();
        
            toast.success("SUCCESS")

        }catch(error){
            toast.error("Something went wrong")
        }

    },[
        currentUser,
        isFollowing,
        userId,
        mutateCurrentUser,
        mutateFetchedUser,
        loginModal
    ]);

    return {
        isFollowing,
        toggleFollow
    }
}

export default useFollow;