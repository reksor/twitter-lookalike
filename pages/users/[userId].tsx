import  { useRouter } from "next/router";
import { ClipLoader } from "react-spinners";

import Header from "@/components/Header";
import useUser from "@/hooks/useUser";

const UserView = () => {
    const router=useRouter()
    const {userId}=router.query;

    const {data: fetchedUser, isLoading}=useUser(userId as string);

    if(isLoading || !fetchedUser){
        return(
            <div className="flex justify-center items-center h-full">
                <ClipLoader color="red" size={80}/>
            </div>
        )
    }
    return ( 
        <div>
            <>
            <Header showBackArrow label={fetchedUser?.name} />
            </>
        </div>
     );
}
 
export default UserView;