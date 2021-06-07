// import axios from 'axios';
// import { setAlert } from './alert';

// import {
//     ADD_MAINTENANCE,
//     UPDATE_MAINTENANCE,
//     PROFILE_ERROR,
//     GET_MAINTENANCE,
//     GET_COMPLETED_MAINTENANCE,
//     ADD_COMPLETED_MAINTENANCE,
//     MAINTENANCE_ERROR
// } from './types';

// // Get Pending Maintenance
// export const getPendingMaintenance = () => async dispatch => {
//     try {
//         const res = await axios.get('/api/pendingmaintenance')

//         dispatch({
//             type: GET_MAINTENANCE,
//             payload: res.data
//         });
//     } catch (err) {
//         dispatch({
//             type: MAINTENANCE_ERROR,
//             payload: { msg: err.response.statusText, status: err.response.status }
//         })
//     }
// }

// // Add Pending Maintenance
// export const addPendingMaintenance = (formData, history) => async dispatch => {
//     try {
//         const config = {
//             headers: {
//                 'Content-Type': 'application/json'
//             }
//         }

//         const res = await axios.post('/api/pendingmaintenance', formData, config);
//         console.log('addPendingMaintenance res:', res)

//         dispatch({
//             type: ADD_MAINTENANCE,
//             payload: res.data
//         });

//         dispatch(setAlert('Pending Maintenance Added', 'success'));

//         // history.push('/dashboard');
//     } catch (err) {
//         const errors = err.response.data.errors;

//         if(errors) {
//             errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
//         }

//         dispatch({
//             type: PROFILE_ERROR,
//             payload: { msg: err.response.statusText, status: err.response.status }
//         }); 
//     }
// }

// // Delete Pending Maintenance
// export const deletePendingMaintenance = id => async dispatch => {
//     if(window.confirm('Are you sure you want to delete this maintenance item?')) {
//         console.log('deletePendingMaintenance ran')
//         try {
//             console.log('deletePendingMaintenance try ran')
//             console.log('deletePendingMaintenance id:', id)
//             const res = await axios.delete(`/api/pendingmaintenance/${id}`);
    
//             dispatch({
//                 type: UPDATE_MAINTENANCE,
//                 payload: res.data
//             })
    
//             // dispatch(setAlert('Goal Removed', 'success'));
//         } catch (err) {
//             dispatch({
//                 type: PROFILE_ERROR,
//                 payload: { msg: err.response.statusText, status: err.response.status }
//             }); 
//         }
//     }
// };

// // Delete Pending Maintenance when adding to Completed Maintenance
// export const deletePendingMaintenanceForCompleted = id => async dispatch => {
//     // if(window.confirm('Are you sure you want to delete this goal?')) {
//         console.log('deletePendingMaintenance ran')
//         try {
//             console.log('deletePendingMaintenance try ran')
//             console.log('deletePendingMaintenance id:', id)
//             const res = await axios.delete(`/api/pendingmaintenance/${id}`);
    
//             dispatch({
//                 type: UPDATE_MAINTENANCE,
//                 payload: res.data
//             })
    
//             // dispatch(setAlert('Goal Removed', 'success'));
//         } catch (err) {
//             dispatch({
//                 type: PROFILE_ERROR,
//                 payload: { msg: err.response.statusText, status: err.response.status }
//             }); 
//         }
//     // }
// };


// // Get Completed Maintenance
// export const getCompletedMaintenance = () => async dispatch => {
//     try {
//         const res = await axios.get('/api/completedmaintenance')

//         dispatch({
//             type: GET_COMPLETED_MAINTENANCE,
//             payload: res.data
//         });
//     } catch (err) {
//         dispatch({
//             type: MAINTENANCE_ERROR,
//             payload: { msg: err.response.statusText, status: err.response.status }
//         })
//     }
// }


// // Add Completed Maintenance  THIS SHOULDN'T TAKE IN FORM DATA
// export const addCompletedMaintenance = (formData, history) => async dispatch => {
//     console.log('addCompletedMaintenance ran in actions')
//     try {
//         const config = {
//             headers: {
//                 'Content-Type': 'application/json'
//             }
//         }

//         const res = await axios.post('/api/completedmaintenance', formData, config);

//         dispatch({
//             type: ADD_COMPLETED_MAINTENANCE,
//             payload: res.data
//         });

//         dispatch(setAlert('Completed Maintenance Added', 'success'));

//         // history.push('/dashboard');
//     } catch (err) {
//         const errors = err.response.data.errors;

//         if(errors) {
//             errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
//         }

//         dispatch({
//             type: MAINTENANCE_ERROR,
//             payload: { msg: err.response.statusText, status: err.response.status }
//         }); 
//     }
// }