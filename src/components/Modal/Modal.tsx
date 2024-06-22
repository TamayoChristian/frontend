import React, { ReactNode, useState } from 'react';
import NewTabs from "../Tabs/NewTabs";
import "./Tabs/Modal.css"

interface ModalType {
    children? : ReactNode;
    isOpen: Boolean;
    toggle: () => void;
}

export default function Modal(props: ModalType){
    return (
        <>
        {
            props.isOpen && (
                <div className='modal-over'>
                    <div className='modal-box'>
                        <NewTabs/>
                        {props.children}
                    </div>
                </div>
            )
        }
        </>
    )
};

export function useModal () {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => {
        setIsOpen(!isOpen);
    }

    return {
        isOpen,
        toggle
    }
}
