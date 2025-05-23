import React from 'react';

const Modal = ({isOpen, onClose, onConfirm, title, message}) => {
    if(!isOpen) return null;

    return (
        <>
            <div className="fixed inset-0 flex items-center justify-center z-50">
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
                <div className="bg-white rounded-xl shadow-2xl p-6 z-10 max-w-md w-full mx-4 transform transition-all">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">{title}</h3>
                    <p className="mb-6 text-gray-600">{message}</p>
                    <div className="flex justify-end space-x-3">
                        <button 
                            className="px-5 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-all font-medium"
                            onClick={onClose}
                        >
                            Cancelar
                        </button>
                        <button 
                            className="px-5 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-all font-medium shadow-md"
                            onClick={onConfirm}
                        >
                            Eliminar
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Modal;