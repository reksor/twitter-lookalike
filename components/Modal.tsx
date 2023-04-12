import React, { useCallback } from "react";

interface ModalProps {
    isOpen?: boolean;
    onClose: ()=> void;
    onSubmit: ()=> void;
    title?: string;
    body?: React.ReactElement;
    footer?:React.ReactElement;
    disabled?: boolean;
}

const Modal: React.FC <ModalProps> = ({
    isOpen,
    onClose,
    onSubmit,
    title,
    body,
    footer,
    disabled
}) => {
    const handleClose= useCallback(()=>{
        if(disabled){
            return;
        }
        onClose()
    },[disabled,onClose]);

    const HanndleSubmit=useCallback(()=>{
        if(disabled){
            return;
        }
        onSubmit()
    },[disabled,onSubmit]);

    if(!open){
        return null;
    }

    return ( 
        <>
        <div className="">

        </div>
        </>
     );
}
 
export default Modal;