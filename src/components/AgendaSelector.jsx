import React, { useState, useEffect } from 'react';
import useContacts from '../hooks/useContacts';

const AgendaSelector = () => {
    const { agendas, currentAgendaSlug, setCurrentAgenda, getAgendas, createAgenda, getContacts } = useContacts();
    const [newAgenda, setNewAgenda] = useState({
        name: '',
        slug: ''
    });
    const [loading, setLoading] = useState(false);

    //Cargo las agendas al montar el componente
    useEffect(() => {
        loadAgendas();
    }, []);

    const loadAgendas = async () => {
        setLoading(true);
        await getAgendas();
        setLoading(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewAgenda(prevState => ({
            ...prevState,
            [name]: value,
            //Si cambia el nombre, generamos el slug a partir del nombre
            ...(name === 'name' && { slug: value.toLowerCase().replace(/\s+/g, '_')})
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(newAgenda.name.trim() && newAgenda.slug.trim()) {
            setLoading(true);

            try {
                await createAgenda(newAgenda);
                await getAgendas();

                setCurrentAgenda(newAgenda.slug);

                setNewAgenda({ name: '', slug: ''});
            } catch (error) {
                console.error('Error al crear la agenda: ', error);
            } finally {
                setLoading(false);
            }
        }
    };

    const handleSelectAgenda = async (slug) => {
        setCurrentAgenda(slug);
        await getContacts();
    };

    return (
        <>
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border border-gray-100">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
                Selecciona una Agenda
            </h2>
            <form onSubmit={handleSubmit} className="mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                            Nombre de la agenda:
                        </label>
                        <input 
                            type="text"
                            id="name"
                            name="name"
                            value={newAgenda.name}
                            onChange={handleInputChange}
                            placeholder="Mi Agenda"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                            required 
                        />
                    </div>
                    <div>
                        <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-2">
                            Slug (identificador):
                        </label>
                        <input 
                            type="text"
                            id="slug"
                            name="slug"
                            value={newAgenda.slug}
                            onChange={handleInputChange}
                            placeholder="mi_agenda" 
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                            required
                        />
                    </div>
                </div>
                <button
                    type="submit"
                    disabled={loading} 
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-semibold shadow-md"
                >
                    {loading ? 'Creando...' : 'Crear Nueva Agenda'}
                </button>
            </form>

            <p className="mt-4 text-gray-600">
                Agenda actual: <strong className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">{currentAgendaSlug || 'Ninguna'}</strong>
            </p>

            {agendas && agendas.length > 0 && (
                <div className="mt-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Agendas disponibles:</h3>
                    <div className="flex flex-wrap gap-2">
                        {agendas.map((agenda) => (
                            <button
                                key={agenda.id}
                                onClick={() => handleSelectAgenda(agenda.slug)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all transform hover:scale-105 ${
                                    agenda.slug === currentAgendaSlug
                                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow'
                                }`}
                            >
                                {agenda.slug}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
        </>
    );
};

export default AgendaSelector;