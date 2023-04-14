import axios from "axios";

import { useCallback, useEffect, useState } from "react";
import {toast} from "react-hot-toast"

import useCurrentUser from "@/hooks/useCurrentUser";
import useUser from "@/hooks/useUser";
import useEditModal from "@/hooks/useEditModal";
import Modal from "../Modal";
import { title } from "process";
import Input from "../Input";

const EditModal = () => {

    const {data:currentUser}=useCurrentUser();
    const {mutate:mutateFetchedUser}=useUser(currentUser?.id);
    
    const editModal=useEditModal()

    const [name,setName]=useState('');
    const [username,setUsername]=useState('');
    const [bio,setBio]=useState('');
    const [profileImage,setProfileImage]=useState('');
    const [coverImage,setCoverImage]=useState('');

    const [isLoading,setIsLoading]=useState(false)

    useEffect(()=>{
        setProfileImage(currentUser?.profileImage)
        setCoverImage(currentUser?.coverImage)
        setBio(currentUser?.bio)
        setUsername(currentUser?.username)
        setName(currentUser?.name)
    },[
        currentUser?.name,
        currentUser?.username,
        currentUser?.bio,
        currentUser?.profileImage,
        currentUser?.coverImage
    ])

    const onSubmit = useCallback(async ()=>{
        try{
            setIsLoading(true);

            await axios.patch('/api/edit', {
            name,
            username,
            bio,
            profileImage,
            coverImage
        });
        mutateFetchedUser();

        //WHAT DOES TOAST DO
        toast.success("Updated")

        editModal.onClose()

        }catch(error){
            toast.error("Something went wrong ://")
        }
        finally{
            setIsLoading(false)
        }
    },[name,username,bio,coverImage,profileImage,editModal,mutateFetchedUser]);

const bodyContent=(
    <div className="flex flex-col gap-4">
        <Input
        placeholder="Name"
        onChange={(e)=> setName(e.target.value)}
        value={name}
        disabled={isLoading}
        />
        <Input
        placeholder="Userame"
        onChange={(e)=> setUsername(e.target.value)}
        value={username}
        disabled={isLoading}
        />
        <Input
        placeholder="Bio"
        onChange={(e)=> setBio(e.target.value)}
        value={bio}
        disabled={isLoading}
        />
    </div>
)

    return (
     <Modal
     disabled={isLoading}
     isOpen={editModal.isOpen}
     title="Edit your Sweeter profile"
     actionLabel="Save"
     onClose={editModal.onClose}
     onSubmit={onSubmit}
     body={bodyContent}
     /> );
}
 
export default EditModal;