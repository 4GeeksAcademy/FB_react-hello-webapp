import React, { useEffect } from "react";
import useContacts from "../hooks/useContacts";
import ContactCard from "../components/ContactCard";
import AgendaSelector from "../components/AgendaSelector";
import { Link } from 'react-router-dom';

const ContactList = () => {

    const { contacts, loading, error, getContacts, currentAgendaSlug } = useContacts();

    // Cargo los contactos si existe alguna agenda seleccionada
    useEffect(() => {
        if (currentAgendaSlug) {
            const loadContacts = async () => {
                await getContacts();
            };
            loadContacts();
        }
    }, [currentAgendaSlug]);

    if (loading) return (
        <>
            <div className="container mx-auto px-4 py-6">
                <AgendaSelector />
                <div className="text-center py-12">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-500 mx-auto mb-4"></div>
                    <p className="text-gray-600 text-lg">Cargando contactos...</p>
                </div>
            </div>
        </>
    );

    if (error) return (
        <div className="container mx-auto px-4 py-6">
            <AgendaSelector />
            <div className="text-center py-12 bg-red-50 rounded-xl">
                <p className="text-red-600 text-lg mb-4">Error: {error}</p>
                <button 
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all font-semibold shadow-md"
                    onClick={getContacts}
                >
                    🔄 Reintentar
                </button>
            </div>
        </div>
    );

    return (
        <>
            <div className="container mx-auto px-4 py-6">
                <AgendaSelector />

                {!currentAgendaSlug ? (
                    <>
                    <div className="bg-white rounded-xl shadow-lg p-8">
                        <div className="text-center">
                            <div className="text-6xl mb-4">👋</div>
                            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
                                Bienvenido al Gestor de Contactos
                            </h2>
                            <p className="text-gray-600 mb-6 text-lg">Para comenzar, selecciona una agenda existente o crea una nueva.</p>
                            <div className="text-left max-w-md mx-auto space-y-3 text-gray-500">
                                <p className="flex items-center gap-2">
                                    <span className="text-blue-500">📚</span>Las agendas te permiten organizar tus contactos en grupos
                                </p>
                                <p className="flex items-center gap-2">
                                    <span className="text-purple-500">➕</span>Puedes crear múltiples agendas para diferentes propósitos
                                </p>
                                <p className="flex items-center gap-2">
                                    <span className="text-green-500">🔒</span>Cada agenda maneja sus propios contactos
                                </p>
                            </div>
                        </div>
                    </div>
                    </>
                ) : (
                    <>
                        <div className="bg-white rounded-xl shadow-lg p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold text-gray-800">
                                    Contactos - <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">{currentAgendaSlug}</span>
                                </h2>
                                <Link 
                                    to="/contacts/new"
                                    className="bg-gradient-to-r from-green-500 to-green-600 text-white px-5 py-2 rounded-lg hover:from-green-600 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all font-semibold shadow-md"
                                >
                                    ➕ Nuevo Contacto
                                </Link>
                            </div>

                            {!contacts || contacts.length === 0 ? (
                                <>
                                    <div className="text-center py-12 bg-gray-50 rounded-xl">
                                        <div className="text-6xl mb-4">📭</div>
                                        <p className="text-gray-600 mb-4 text-lg">No hay contactos en esta agenda.</p>
                                        <Link
                                            to="/contacts/new" 
                                            className="inline-block bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-lg hover:from-green-600 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all font-semibold shadow-md"
                                        >
                                            Crear primer contacto
                                        </Link>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <ul className="space-y-3">
                                        {contacts.map(contact => {
                                            return (
                                                <li key={contact.id} >
                                                    <ContactCard contact={contact} />
                                                </li>
                                            )
                                        })}
                                    </ul>
                                </>
                            )}
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

export default ContactList;