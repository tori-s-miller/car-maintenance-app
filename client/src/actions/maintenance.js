import axios from 'axios';
import { setAlert } from './alert';

import {
    ADD_MAINTENANCE,
    // UPDATE_MAINTENANCE,
    PROFILE_ERROR,
    GET_MAINTENANCE,
    MAINTENANCE_ERROR
} from './types';

// Get Pending Maintenance
export const getPendingMaintenance = () => async dispatch => {
    console.log('getPendingMaintenance ran')
    console.log('getPendingMaintenance dispatch:', dispatch)
    try {
        const res = await axios.get('/api/pendingmaintenance')
        console.log('getPendingMaintenance res:', res)
        console.log('getPendingMaintenance GET_MAINTENANCE:', GET_MAINTENANCE)

        dispatch({
            type: GET_MAINTENANCE,
            payload: res.data
        });
    } catch (err) {
        console.log('getPendingMaintenance catch err:', err)
        dispatch({
            type: MAINTENANCE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

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
            type: ADD_MAINTENANCE,
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