import axios from 'axios';
import { setAlert } from './alert';

import {
    UPDATE_MAINTENANCE,
    PROFILE_ERROR
} from './types';

// Add Pending Maintenance
export const addPendingMaintenance = (formData, history) => async dispatch => {
    console.log('history:', history)
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const res = await axios.post('/api/pendingmaintenance', formData, config);

        dispatch({
            type: UPDATE_MAINTENANCE,
            payload: res.data
        });

        dispatch(setAlert('Pending Maintenance Added', 'success'));

        // history.push('/dashboard');
    } catch (err) {
        const errors = err.response.data.errors;

        if(errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        }); 
    }
}