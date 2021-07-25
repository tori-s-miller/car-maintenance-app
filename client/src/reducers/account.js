import {
    GET_ACCOUNT,
    UPDATE_ACCOUNT,
    ACCOUNT_ERROR
} from '../actions/types';

const initialState = {
    user: null,
    loading: true,
    error: {}
}

export default function(state = initialState, action) {
    const { type, payload } = action;
    // console.log('account reducer state:', state)

    switch(type) {
        case GET_ACCOUNT:
            case UPDATE_ACCOUNT:
                return {
                    ...state,
                    user: payload,
                    loading: false
                };
        case ACCOUNT_ERROR:
            return {
                ...state,
                error: payload,
                loading: false,
                user: null
            };
        default:
            return state;
    }
}