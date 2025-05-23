import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useContacts from '../hooks/useContacts';
import Modal from './Modal';

const ContactCard = ({ contact }) => {
    const { deleteContact } = useContacts();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleDelete = async () => {
        const success = await deleteContact(contact.id);
        if (success) {
            closeModal();
        } else {
            // Pensar en posible mensaje de error
            closeModal();
        }
    };

    return (
        <>
            <div className="bg-gradient-to-r from-gray-50 to-white rounded-xl p-5 hover:shadow-lg transition-all duration-300 border border-gray-200 hover:border-purple-300">
                <div className="flex justify-between items-center">
                    <div className="space-y-2">
                        <div className="font-semibold text-lg text-gray-800">{contact.name}</div>
                        <div className="text-gray-600 text-sm flex items-center gap-2">
                            <span className="text-blue-500">✉️</span> {contact.email}
                        </div>
                        <div className="text-gray-600 text-sm flex items-center gap-2">
                            <span className="text-green-500">📱</span> {contact.phone}
                        </div>
                        {contact.address && (
                            <div className="text-gray-600 text-sm flex items-center gap-2">
                                <span className="text-purple-500">📍</span> {contact.address}
                            </div>
                        )}
                    </div>
                    <div className="flex gap-3">
                        <Link
                            to={`/contacts/${contact.id}/edit`}
                            className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm hover:shadow-md font-medium text-sm"
                        >
                            ✏️ Editar
                        </Link>
                        <button 
                            className="bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-lg hover:from-red-600 hover:to-red-700 transition-all focus:outline-none focus:ring-2 focus:ring-red-500 shadow-sm hover:shadow-md font-medium text-sm"
                            onClick={openModal}
                        >
                            🗑️ Eliminar
                        </button>
                    </div>
                </div>
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={closeModal}
                onConfirm={handleDelete}
                title="Confirmar eliminación"
                message={`¿Estás seguro que deseas eliminar el contacto ${contact.name}?`}
            />
        </>
    );
};

export default ContactCard;