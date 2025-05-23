import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useContacts from '../hooks/useContacts';

const ContactForm = () => {
    const { contactId } = useParams();
    const navigate = useNavigate();
    const { getContact, createContact, updateContact, loading, error, currentAgendaSlug } = useContacts();

    const [ formData, setFormData ] = useState({
        name: "",
        email: "",
        phone: "",
        address: ""
    });

    useEffect(() => {
        if (!currentAgendaSlug) {
            navigate('/');
            return;
        }
    }, [currentAgendaSlug, navigate])

    //Cargar datos del contacto en modo edición
    useEffect(() => {
        const loadContact = async () => {
            if (contactId && currentAgendaSlug) {
                const contact = await getContact(contactId);
                if (contact) {
                    setFormData({
                        name: contact.name || "",
                        email: contact.email || "",
                        phone: contact.phone || "",
                        address: contact.address || ""
                    });
                } else {
                    // Si el contacto no existe, redirecciono
                    navigate('/');
                }
            }
        };

        loadContact();
    }, [contactId, currentAgendaSlug]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!currentAgendaSlug) {
            alert('Debes seleccionar una agenda antes de crear un contacto');
            navigate('/');
            return;
        }

        if(!formData.name || !formData.email || !formData.phone ) {
            alert('Nombre, email y teléfono son obligatorios');
            return;
        }

        let success;

        if (contactId) {
            success = await updateContact(contactId, formData);
        } else {
            success = await createContact(formData);
        }

        if (success) {
            navigate('/');
        }
    };

    const handleCancel = () => {
        navigate('/');
    };

    if(!currentAgendaSlug) {
        return (
            <>
                <div className="container mx-auto px-4 py-6">
                    <div className="bg-white rounded-xl shadow-lg p-8 max-w-md mx-auto">
                        <div className="text-center">
                            <div className="text-6xl mb-4">📋</div>
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">Sin agenda seleccionada</h2>
                            <p className="text-gray-600 mb-6">Debes seleccionar una agenda antes de crear un contacto.</p>
                            <button 
                                onClick={() => navigate('/')}
                                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all shadow-md"
                            >
                                Ir a seleccionar agenda
                            </button>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <div className="container mx-auto px-4 py-6">
                <div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl mx-auto">
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
                        {contactId ? '✏️ Editar Contacto' : '➕ Nuevo Contacto'}
                    </h2>
                    <p className="text-gray-600 mb-6">
                        Agenda: <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">{currentAgendaSlug}</span>
                    </p>
                    {error && (
                        <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                                Nombre:
                            </label>
                            <input 
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Nombre completo"
                                required 
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all" 
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                                Email:
                            </label>
                            <input 
                                type="email" 
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="correo@ejemplo.com"
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all" 
                            />
                        </div>

                        <div>
                            <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                                Teléfono:
                            </label>
                            <input 
                                type="tel" 
                                id="phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="+34600123456"
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all" 
                            />
                        </div>

                        <div>
                            <label htmlFor="address" className="block text-sm font-semibold text-gray-700 mb-2">
                                Dirección:
                            </label>
                            <input 
                                type="text" 
                                id="address"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                placeholder="Calle, Ciudad"
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all" 
                            />
                        </div>

                        <div className="flex gap-3 pt-6">
                            <button 
                                type="submit"
                                disabled={loading}
                                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-semibold shadow-md"
                            >
                                {loading ? '⏳ Guardando...' : '💾 Guardar'}
                            </button>
                            <button 
                                type="button"
                                onClick={handleCancel}
                                className="flex-1 bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all font-semibold"
                            >
                                Cancelar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default ContactForm;