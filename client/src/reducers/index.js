import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import maintenance from './maintenance';
import account from './account';
// import profile from './profile';
console.log('reducer index alert:', alert)
console.log('reducer index auth:', auth)
console.log('reducer index maintenance:', maintenance)

export default combineReducers({
    alert,
    auth,
    account
    // maintenance
    // profile
});