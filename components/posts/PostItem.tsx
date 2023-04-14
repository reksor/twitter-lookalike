import { useRouter } from "next/router";
import { useCallback, useMemo } from "react";
import { formatDistanceToNowStrict } from "date-fns";

import useLoginModal from "@/hooks/useLoginModal";
import useCurrentUser from "@/hooks/useCurrentUser";
import Avatar from "../Avatar";

interface PostItemProps{
    //Record??
    data: Record<string, any>;
    userid?: string
}

const PostItem: React.FC<PostItemProps> = ({
    data,
    userid
}) => {

const router =useRouter()
const loginModal=useLoginModal();

const {data: currentUser}=useCurrentUser();

const goToUser=useCallback((event:any)=>{
    //overwrite global onClick parant
event.stopPropagation();
    
router.push(`/users/${data.user.id}`);
},[router, data.user.id]);

const goToPost = useCallback(()=>{
    router.push(`/posts/${data.id}`)
},[router, data.id]);

const onLike = useCallback((event: any)=>{

event.stopPropagation();

if(!currentUser){
return loginModal.onOpen();
}

},[loginModal]);

const createdAt = useMemo(()=>{
if(!data?.createdAt) {
    return null;
}

return formatDistanceToNowStrict(new Date(data.createdAt))
},[data.createdAt]);


    return ( 
        <div 
        onClick={goToPost}
        className="
        border-b-[1px]
        border-neutral-800
        p-5
        cursor-pointer
        hover:bg-neutral-900
        transition
        "
        >
            {/* <div className="flex flex-row items-start gap-3">
            <Avatar userId={data.user.id}/>
            </div>
            <div>
                <div className="
                flex flex-row items-center gap-2
                ">
                    <p 
                    onClick={goToUser}
                    className="text-white font-semibold cursor-pointer hover:underline">
                        {data.user.name}
                    </p>
                    <span 
                    onClick={goToUser}
                    className="
                    text-neutral-500
                    cursor-pointer
                    hover:underline
                    hidden
                    md:block
                    ">
                        @{data.user.username}
                    </span>
                    <span className="text-neutral-500 text-sm">
                    {createdAt}
                    </span>
                </div>
            </div> */}

        </div>
     );
}
 
export default PostItem;