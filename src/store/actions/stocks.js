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
                let { symbol, open, latestPrice } = res.data;
                postStock(symbol, open, latestPrice);
                return getStockFromAPI('FB')
            })
            .then(res => {
                let { symbol, open, latestPrice } = res.data;
                postStock(symbol, open, latestPrice);
                return getStockFromAPI('GOOGL')
            })
            .then(res => {
                let { symbol, open, latestPrice } = res.data;
                postStock(symbol, open, latestPrice);
                return getStockFromAPI('MSFT')
            })
            .then(res => {
                let { symbol, open, latestPrice } = res.data;
                postStock(symbol, open, latestPrice);
                return getStockFromAPI('TSLA')
            })
            .then(res => {
                let { symbol, open, latestPrice } = res.data;
                postStock(symbol, open, latestPrice);
                return getStockFromAPI('YELP')
            })
            .then(res => {
                let { symbol, open, latestPrice } = res.data;
                postStock(symbol, open, latestPrice);
            })
            .then(() => axios.get('/api/stocks'))
            .then(stocks => dispatch(_loadInitialStocks(filterStocks(stocks))));
    }
)