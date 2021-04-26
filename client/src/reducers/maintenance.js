import {
    ADD_MAINTENANCE,
    GET_MAINTENANCE,
    UPDATE_MAINTENANCE,
    MAINTENANCE_ERROR
} from '../actions/types';

const initialState = {
    pendingMaintenance: [],
    pendingMaintenanceItem: null,
    loading: true,
    error: {}
}

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch(type) {
        case GET_MAINTENANCE:
            return {
                ...state,
                pendingMaintenance: payload,
                loading: false
            };
        case ADD_MAINTENANCE:
            return {
                ...state,
                pendingMaintenance: [...state.pendingMaintenance, payload],
                loading: false
            };
        case MAINTENANCE_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            };
    }
}