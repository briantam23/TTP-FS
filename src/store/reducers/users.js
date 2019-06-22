import { LOAD_INITIAL_USERS, CREATE_USER, UPDATE_USER, DESTROY_USER } from '../constants';


const usersReducer = (state = [], action) => {
    switch(action.type) {
        case LOAD_INITIAL_USERS:
            return action.users;
        case CREATE_USER:
            return [...state, action.users];
        case UPDATE_USER:
            return state.map(user => user.id !== action.users.id ? user : action.users);
        case DESTROY_USER:
            return state.filter(user => user.id !== action.users.id)
        default:
            return state;
    }
}

export default usersReducer;