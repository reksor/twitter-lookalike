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
            let request;

            if(isFollowing){
                //in delete we need "data" bc this is how it will accept the body
                console.log("Is Following");
                
                request = () => axios.delete('/api/follow', {data: {userId}});
            }else{
                //in "post" req you can just pass the body
                console.log("Isnt Following");
                request=()=> axios.post('/api/follow', {userId})
            }
            

            await request();
            mutateCurrentUser();
            mutateFetchedUser();
        
            toast.success("SWEEET")

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