import axios from 'axios';
import { LOAD_INITIAL_USERS, CREATE_USER, UPDATE_USER, DESTROY_USER } from '../constants';


const _loadInitialUsers = users => ({
    type: LOAD_INITIAL_USERS,
    users
})
export const loadInitialUsers = () => (
    dispatch => (
        axios.get('/api/users')
            .then(res => res.data)
            .then(users => dispatch(_loadInitialUsers(users)))
    )
)

const _createUser = user => ({
    type: CREATE_USER,
    users: user
})
export const createUser = (user, history) => (
    dispatch => (
        axios.post('/api/users', user)
            .then(res => res.data)
            .then(_user => {
                dispatch(_createUser(_user));
                history.push('/');
            })
    )
)

const _updateUser = user => ({
    type: UPDATE_USER,
    users: user
})
export const updateUser = user => (
    dispatch => (
        axios.put(`/api/users/${user.id}`, user)
            .then(res => res.data)
            .then(_user => dispatch(_updateUser(_user)))
    )
)

const _destroyUser = user => ({
    type: DESTROY_USER,
    users: user
})
export const destroyUser = user => (
    dispatch => (
        axios.delete(`/api/users/${user.id}`)
            .then(() => dispatch(_destroyUser(user)))
    )
)