import { LOAD_INITIAL_STOCKS } from '../constants';
import axios from 'axios';
import { getStockFromAPI, postStock, filterStocks } from '../../util';


const _loadInitialStocks = stocks => ({
    type: LOAD_INITIAL_STOCKS,
    stocks
})
export const loadInitialStocks = () => (
    dispatch => {
        return getStockFromAPI('AAPL')
            .then(res => {
                postStock(res);
                return getStockFromAPI('FB')
            })
            .then(res => {
                postStock(res);
                return getStockFromAPI('GOOGL')
            })
            .then(res => {
                postStock(res);
                return getStockFromAPI('MSFT')
            })
            .then(res => {
                postStock(res);
                return getStockFromAPI('TSLA')
            })
            .then(res => {
                postStock(res);
                return getStockFromAPI('YELP')
            })
            .then(res => {
                postStock(res);
            })
            .then(() => axios.get('/api/stocks'))
            .then(stocks => dispatch(_loadInitialStocks(filterStocks(stocks))));
    }
)