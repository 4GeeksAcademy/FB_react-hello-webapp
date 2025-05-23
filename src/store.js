

export const initialStore = {
    contacts: [],
    currentAgendaSlug: null,
    agendas: [],
    loading: false,
    error: null,
};

export default function storeReducer(store, action = {}) {
  switch (action.type) {

        case 'fetch_agendas_start':
            return {
                ...store,
                loading: true,
                error: null
            };

        case 'fetch_agendas_success':
            return {
                ...store,
                agendas: action.payload,
                loading: false
            };

        case 'fetch_agendas_error':
            return {
                ...store,
                error: action.payload,
                loading: false
            };

        case 'create_agenda_success':
            return {
                ...store,
                agendas: [...store.agendas, action.payload]
            };

        case 'delete_agenda_success':
            return {
                ...store,
                agendas: store.agendas.filter(agenda => agenda.slug !== action.payload)
            };

        case 'set_current_agenda':
            return {
                ...store,
                currentAgendaSlug: action.payload,
                contacts: []
            };

        case 'fetch_contacts_start':
            return {
                ...store,
                loading: true,
                error: null
            };

        case 'fetch_contacts_success':
            return {
                ...store,
                contacts: action.payload,
                loading: false
            };

        case 'fetch_contacts_error':
            return {
                ...store,
                error: action.payload,
                loading: false
            };

        case 'create_contact_success':
            return {
                ...store,
                contacts: [...store.contacts, action.payload]
            };

        case 'update_contact_success':
            return {
                ...store,
                contacts: store.contacts.map( contact => 
                    contact.id === action.payload.id ? action.payload : contact
                )
            };

        case 'delete_contact_success':
            return {
                ...store,
                contacts: store.contacts.filter(contact => contact.id !== action.payload)
            };

        default:
            return store;

    }    
}
