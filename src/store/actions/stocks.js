import { LOAD_INITIAL_STOCKS } from '../constants';
import axios from 'axios';


const _loadInitialStocks = stocks => ({
    type: LOAD_INITIAL_STOCKS,
    stocks
})
export const loadInitialStocks = () => (
    dispatch => (
        axios.get('/api/stocks')
            .then(res => res.data)
            .then(stocks => dispatch(_loadInitialStocks(stocks)))
    )
)