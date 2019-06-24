import { SET_AUTH, UPDATE_AUTH } from '../constants';


const authReducer = (state = {}, action) => {
    switch(action.type) {
        case SET_AUTH:
            return action.auth;
        case UPDATE_AUTH:
            console.log('auth')
            return action.auth;
        default:
            return state;
    }
}


export default authReducer;