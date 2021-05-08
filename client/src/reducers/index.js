import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import maintenance from './maintenance';
// import profile from './profile';
console.log('reducer index alert:', alert)
console.log('reducer index auth:', auth)
console.log('reducer index maintenance:', maintenance)

export default combineReducers({
    alert,
    auth,
    maintenance
    // profile
});