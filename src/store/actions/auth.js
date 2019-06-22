import { SET_AUTH } from '../constants';
import axios from 'axios';


const exchangeTokenForAuth = history => (
    dispatch => {
        const token = window.localStorage.getItem('token');
        if(!token) return;
        return axios.get('/api/auth', {
            headers: { authorization: token }
        })
            .then(res => res.data)
            .then(auth => {
                dispatch(_setAuth(auth));
                //history.push('/');
            })
            .catch(ex => window.localStorage.removeItem('token'))
    }
)

const _setAuth = auth => ({
    type: SET_AUTH,
    auth
})

export const logout = () => {
    window.localStorage.removeItem('token');
    return _setAuth({});
}

export const login = (credentials, history) => (
    dispatch => (
        axios.post('/api/auth', credentials)
            .then(res => res.data)
            .then(data => {
                window.localStorage.setItem('token', data.token);
                dispatch(exchangeTokenForAuth(history));
            })
    )
)