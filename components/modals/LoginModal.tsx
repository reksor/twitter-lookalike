import useLoginModal from "@/hooks/useLoginModal";
import useRegisterModal from "@/hooks/useRegisterModal";
import { useCallback, useState } from "react";
import Input from "../Input";
import Modal from "../Modal";

const LoginModal = () => {
    const loginModal=useLoginModal();
    const registerModal=useRegisterModal()

    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [isLoading,setIsLoading]=useState(false);

    const onToggle = useCallback(()=>{
        if(isLoading){
            return;
        }

        loginModal.onClose();
        registerModal.onOpen();

    },[isLoading,registerModal,loginModal])

    const onSubmit=useCallback(async()=>{
        try{
            setIsLoading(true);

            //TODO add login

            loginModal.onClose()

        } catch(error){
            console.log(error);
            
        }finally{
            setIsLoading(false)
        }
    },[loginModal]);

const bodyContent=(
    <div className="flex flex-col gap-4">
        <Input 
        placeholder="Email"
        onChange={(e)=>setEmail(e.target.value)}
        value={email}
        disabled={isLoading}
        />
          <Input 
        placeholder="Password"
        onChange={(e)=>setPassword(e.target.value)}
        value={password}
        disabled={isLoading}
        />
    </div>
)

const footerContent=(
    <div 
    onClick={onToggle}
    className=" text-neutral-400 text-center mt-4">
        <p>Don't have an account? </p>
        <span className="
        text-white
        cursor-pointer
        hover:underline
        ">
             Create a Sweeter</span>
    </div>
)

    return (
        <Modal 
        disabled={isLoading}
        isOpen={loginModal.isOpen}
        title="Login"
        actionLabel="Sign in"
        onClose={loginModal.onClose}
        onSubmit={onSubmit}
        body={bodyContent}
        footer={footerContent}
        />
      );
}
 
export default LoginModal;