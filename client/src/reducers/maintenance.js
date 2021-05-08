import {
    ADD_MAINTENANCE,
    GET_MAINTENANCE,
    MAINTENANCE_ERROR
} from '../actions/types';

const initialState = {
    pendingMaintenance: null,
    pendingMaintenanceItems: [],
    loading: true,
    error: {}
}

export default function(state = initialState, action) {
    console.log('maintenance state:', state)
    console.log('maintenance action:', action)
    const { type, payload } = action;
    console.log('reducer payload:', payload)

    switch(type) {
        case GET_MAINTENANCE:
            console.log('GET_MAINTENANCE ran')
            return {
                ...state,
                pendingMaintenanceItems: payload,
                loading: false
            };
        case ADD_MAINTENANCE:
            console.log('ADD_MAINTENANCE ran')
            return {
                ...state,
                pendingMaintenanceItems: [...state.pendingMaintenanceItems, payload],
                loading: false
            };
        case MAINTENANCE_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            };
        default:
            return state;
    }
}

console.log('maintenance.js initialState:', initialState)