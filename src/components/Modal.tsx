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
                className='custom-slide-up bg-white rounded-xl shadow-2xl w-full max-w-md h-max py-3 m-4'
                onClick={(e) => e.stopPropagation()}>
                <div className="flex justify-between items-center mb-4 px-3 pb-2 border-b-2 border-[#bcbcbc]">
                    <h2 className="text-lg text-gray-800">{title}</h2>
                    <button 
                        onClick={onClose} 
                        className="text-gray-400 hover:text-red-500 transition-colors text-2xl cursor-pointer"
                    >
                        &times;
                    </button>
                </div>
                <div className='px-3'>{children}</div>
            </div>
        </div>
    )
}

export default Modal;