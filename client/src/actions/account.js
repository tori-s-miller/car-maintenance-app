import axios from 'axios';
import { setAlert } from './alert';

import {
    GET_ACCOUNT,
    UPDATE_ACCOUNT,
    ACCOUNT_ERROR
} from './types';


// Get Pending Maintenance
export const getPendingMaintenance = () => async dispatch => {
    console.log('getPendingMaintenance ran')
    try {
        const res = await axios.get('/api/account/pendingmaintenance')

        dispatch({
            type: GET_ACCOUNT,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: ACCOUNT_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}


export const addPendingMaintenance = (formData, id) => async dispatch => {
    console.log('addPendingMaintenance formData:', formData)
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const res = await axios.post('/api/account/pendingmaintenance', formData, config);

        dispatch({
            type: UPDATE_ACCOUNT,
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
            type: ACCOUNT_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        }); 
    }
}

// Delete Pending Maintenance
export const deletePendingMaintenance = id => async dispatch => {
    console.log('deletePendingMaintenance id:', id)
    if(window.confirm('Are you sure you want to delete this maintenance item?')) {
        console.log('deletePendingMaintenance ran')
        try {
            console.log('deletePendingMaintenance try ran')
            console.log('deletePendingMaintenance id:', id)
            const res = await axios.delete(`/api/account/pendingmaintenance/${id}`);
    
            dispatch({
                type: UPDATE_ACCOUNT,
                payload: res.data
            })
    
            // dispatch(setAlert('Goal Removed', 'success'));
        } catch (err) {
            dispatch({
                type: ACCOUNT_ERROR,
                payload: { msg: err.response.statusText, status: err.response.status }
            }); 
        }
    }
};

// Delete Pending Maintenance when adding to Completed Maintenance
export const deletePendingMaintenanceForCompleted = id => async dispatch => {
    // if(window.confirm('Are you sure you want to delete this goal?')) {
        console.log('deletePendingMaintenance ran')
        try {
            console.log('deletePendingMaintenance try ran')
            console.log('deletePendingMaintenance id:', id)
            const res = await axios.delete(`/api/account/pendingmaintenance/${id}`);
    
            dispatch({
                type: UPDATE_ACCOUNT,
                payload: res.data
            })
    
            // dispatch(setAlert('Goal Removed', 'success'));
        } catch (err) {
            dispatch({
                type: ACCOUNT_ERROR,
                payload: { msg: err.response.statusText, status: err.response.status }
            }); 
        }
    // }
};


// Get Completed Maintenance
export const getCompletedMaintenance = () => async dispatch => {
    try {
        const res = await axios.get('/api/account/completedmaintenance')

        dispatch({
            type: GET_ACCOUNT,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: ACCOUNT_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}


// Add Completed Maintenance  THIS SHOULDN'T TAKE IN FORM DATA
export const addCompletedMaintenance = (formData, history) => async dispatch => {
    console.log('addCompletedMaintenance ran in actions')
    console.log('addCompletedMaintenance formData:', formData)

    try {
        console.log('addCompletedMaintenance try block ran')
        
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const res = await axios.post('/api/account/completedmaintenance', formData, config);

        console.log('addCompletedMaintenance res:', res)

        dispatch({
            type: UPDATE_ACCOUNT,
            payload: res.data
        });

        dispatch(setAlert('Completed Maintenance Added', 'success'));

        // history.push('/dashboard');
    } catch (err) {
        const errors = err.response.data.errors;

        if(errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: ACCOUNT_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        }); 
    }
}