import { SET_AUTH, UPDATE_AUTH } from '../constants';
import axios from 'axios';


const exchangeTokenForAuth = () => (
    dispatch => {
        const token = window.localStorage.getItem('token');
        if(!token) return;
        return axios.get('/api/auth', {
            headers: { authorization: token }
        })
            .then(res => res.data)
            .then(auth => dispatch(_setAuth(auth)))
            .catch(ex => window.localStorage.removeItem('token'))
    }
)

const _setAuth = auth => ({
    type: SET_AUTH,
    auth
})

export const _updateAuth = auth => ({
    type: SET_AUTH,
    auth
})

export const logout = () => {
    window.localStorage.removeItem('token');
    return _setAuth({});
}

export const login = credentials => (
    dispatch => (
        axios.post('/api/auth', credentials)
            .then(res => res.data)
            .then(data => {
                window.localStorage.setItem('token', data.token);
                dispatch(exchangeTokenForAuth());
            })
    )
)