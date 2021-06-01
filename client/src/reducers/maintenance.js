import {
    ADD_MAINTENANCE,
    GET_MAINTENANCE,
    DELETE_MAINTENANCE,
    ADD_COMPLETED_MAINTENANCE,
    GET_COMPLETED_MAINTENANCE,
    MAINTENANCE_ERROR
} from '../actions/types';

const initialState = {
    pendingMaintenanceItems: [],
    completedMaintenanceItems: [],
    loading: true,
    error: {}
}

export default function(state = initialState, action) {
    console.log('reducer state:', state)
    const { type, payload } = action;

    switch(type) {
        case GET_MAINTENANCE:
            return {
                ...state,
                pendingMaintenanceItems: payload,
                loading: false
            };
        case ADD_MAINTENANCE:
            return {
                ...state,
                pendingMaintenanceItems: [...state.pendingMaintenanceItems, payload],
                loading: false
            };
        case ADD_COMPLETED_MAINTENANCE:
            return {
                ...state,
                completedMaintenanceItems: [...state.completedMaintenanceItems, payload],
                loading: false
            };
        case GET_COMPLETED_MAINTENANCE:
            return {
                ...state,
                completedMaintenanceItems: payload,
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