import {
    GET_ACCOUNT,
    UPDATE_ACCOUNT,
    ACCOUNT_ERROR
} from '../actions/types';

// const initialState = {
//     account: null,
//     loading: true,
//     error: {}
// }

const initialState = {
    user: null,
    loading: true,
    error: {}
}

export default function(state = initialState, action) {
    console.log('account reducer state:', state)
    console.log('account reducer action:', action)
    const { type, payload } = action;
    console.log('account reducer type:', type)
    console.log('account reducer payload:', payload)

    switch(type) {
        // case GET_ACCOUNT:
        // case UPDATE_ACCOUNT:
        //     return {
        //         ...state,
        //         account: payload,
        //         loading: false
        //     };
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
                account: null
            };
        default:
            return state;
    }
}