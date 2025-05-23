import useGlobalReducer from "./useGlobalReducer";

const API_URL = 'https://playground.4geeks.com/contact';

export const useContacts = () => {
    const { store, dispatch} = useGlobalReducer();

    //Método para agendas

    const getAgendas = async () => {
        dispatch({ type: 'fetch_agendas_start'});

        try {
            console.log('Entre al try getAgendas')
            const response = await fetch(`${API_URL}/agendas`);

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`)
            }

            const data = await response.json();
            dispatch({type: 'fetch_agendas_success', payload: data.agendas});
            console.log('he completado getAgendas')
            return data.agendas;
        } catch (error) {
            dispatch({type: 'fetch_agendas_error', payload: error.message});
            console.log('error en fetch getAgendas', error);
            return[];
        }
    };

    const createAgenda = async ({name, slug}) => {
        dispatch({ type: 'fetch_agendas_start' });
        try {
            console.log('Entre a createAgenda');
            const response = await fetch(`${API_URL}/agendas/${slug}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, slug})
            });

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }

            const data = await response.json();
            dispatch({ type: 'create_agenda_success', payload: data });
            console.log('createAgenda finalizado');
            return data;
        } catch (error) {
            dispatch({ type: 'fetch_agendas_error', payload: error.message})
            console.log('Error en createAgenda')
            return null;
        }
    };

    const deleteAgenda = async (slug) => {
        try {
            console.log('He entrado en deleteAgenda')
            const response = await fetch(`${API_URL}/agendas/${slug}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                console.log('Error al eliminar la agenda');
                throw new Error('Error al eliminar la agenda');
            }

            dispatch({ type: 'delete_agenda_success', payload: slug});
            return true;
        } catch (error) {
            dispatch({ type: 'fetch_agendas_error', payload: error.message});
            console.log('He ingresado al catch en delteAgenda');
            return false
        }
    };

    //Establecer la currentAgenda
    const setCurrentAgenda = (slug) => {
        dispatch({ type: 'set_current_agenda', payload: slug});
    };

    //Método para contactos

    const getContacts = async () => {

        if (!store.currentAgendaSlug) {
            console.log('No hay agenda seleccionada');
            return [];
        }
        
        dispatch({ type: 'fetch_contacts_start' });

        try {
            console.log(' He entrado a getContacts');
            
            const response = await fetch(`${API_URL}/agendas/${store.currentAgendaSlug}/contacts`);

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }

            const data = await response.json();
            dispatch({ type: 'fetch_contacts_success', payload: data.contacts });

            return data.contacts;
        } catch (error) {
            dispatch({ type: 'fetch_contacts_error', payload: error.message});
            return [];
        }
    };

    const getContact = async (contactId) => {
        try {
            console.log('He entrado a getContact');
            //Buscar en el contacto en el estado actual
            const existingContact = store.contacts.find(contact => contact.id === parseInt(contactId));

            if (existingContact) {
                return existingContact;
            }

            const contacts = await getContacts();
            console.log('getContact con éxito')
            return contacts.find(contact => contact.id === parseInt(contactId) || null);
        } catch (error) {
            dispatch({ type: 'fetch_contacts_error', payload: error.message });
            return null;
        }
    };

    const createContact = async (contactData) => {

        if (!store.currentAgendaSlug) {
            console.log('No hay agenda seleccionada para crear contacto');
            return null;
        }

        try {
            console.log('He entrado a createContact');

            const response = await fetch(`${API_URL}/agendas/${store.currentAgendaSlug}/contacts`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(contactData)
            });

            if (!response.ok) {
                throw new Error('Error al crear el contacto');
            }

            const data = await response.json();
            dispatch({ type: 'create_contact_success', payload: data});

            console.log('createContact exitoso');
            return data;
        } catch (error) {
            dispatch({ type: 'fetch_contacts_error', payload: error.message});
            console.log('He entrado en el catch de createContact');
            return null;
        }
    };

    const updateContact = async (contactId, contactData) => {

        if (!store.currentAgendaSlug) {
            console.log('No hay agenda seleccionada para actualizar contacto');
            return null;
        }
        
        try {
            console.log('He entrado en updateContact');
            const response = await fetch(`${API_URL}/agendas/${store.currentAgendaSlug}/contacts/${contactId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(contactData)
            });

            if (!response.ok) {
                throw new Error('Error al actualizar el contacto');
            }

            const data = await response.json();
            dispatch({ type: 'update_contact_success', payload: data});
            console.log('updateContact exitoso');
            return data;
        } catch (error) {
            dispatch({ type: 'fetch_contacts_error', payload: error.message });
            console.log('Error en updateContact');
            return null;
        }
    };

    const deleteContact = async (contactId) => {

        if (!store.currentAgendaSlug) {
            console.log('No hay agenda seleccionada para eliminar contacto');
            return null;
        }

        try {
            console.log('He entrado en deleteContact');
            const response = await fetch(`${API_URL}/agendas/${store.currentAgendaSlug}/contacts/${contactId}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                throw new Error('Error al eliminar el contacto');
            }

            dispatch({ type: 'delete_contact_success', payload: contactId});
            console.log('deleteContact exitoso');

            return true;
        } catch (error) {
            dispatch({ type: 'fetch_contacts_error', payload: error.message});
            console.log('He entrado en el catch de deleteContact');
            return false;
        }
    };

    return {
        //Estados
        agendas: store.agendas,
        currentAgendaSlug: store.currentAgendaSlug,
        contacts: store.contacts,
        loading: store.loading,
        error: store.error,

        //Métodos agendas
        getAgendas,
        createAgenda,
        deleteAgenda,
        setCurrentAgenda,

        //Métodos contactos
        getContacts,
        getContact,
        createContact,
        updateContact,
        deleteContact
    };
};

export default useContacts;