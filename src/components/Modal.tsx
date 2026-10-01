import React from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}

const Modal = ({isOpen, onClose, title, children}: ModalProps) => {
    if (!isOpen) return null;

    return (
        <div 
            className="fixed inset-0 z-50 flex justify-center bg-[#00000046] bg-opacity-50 backdrop-blur-xs"
            onClick={onClose}>
            <div
                className='custom-slide-up bg-white dark:bg-[#3a3a3a] rounded-xl shadow-2xl w-full max-w-md h-max py-3 m-4'
                onClick={(e) => e.stopPropagation()}>
                <div className="flex justify-between items-center mb-4 px-3 pb-2 border-b-2 border-[#bcbcbc]">
                    <h2 className="text-xl text-[#252525] dark:text-[#cbcbcb]">{title}</h2>
                    <button 
                        onClick={onClose} 
                        className="text-[#c3c3c3] hover:text-[#a1a1a1] transition-colors text-3xl cursor-pointer"
                    >
                        &times;
                    </button>
                </div>
                <div className='px-3 text-lg'>{children}</div>
            </div>
        </div>
    )
}

export default Modal;