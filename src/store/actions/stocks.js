import { LOAD_INITIAL_STOCKS } from '../constants';
import axios from 'axios';


const _loadInitialStocks = stocks => ({
    type: LOAD_INITIAL_STOCKS,
    stocks
})
export const loadInitialStocks = () => (
    dispatch => {
        const stocks = [];
        let apple, facebook, google, microsoft, tesla, yelp;
        return axios.get(`https://cloud.iexapis.com/stable/stock/aapl/quote?token=${process.env.IEX_API_KEY}`)
            .then(res => {
                let { symbol, open, latestPrice } = res.data;
                apple = { symbol, open, latestPrice };
                return axios.get(`https://cloud.iexapis.com/stable/stock/fb/quote?token=${process.env.IEX_API_KEY}`)
            })
            .then(res => {
                let { symbol, open, latestPrice } = res.data;
                facebook = { symbol, open, latestPrice };
                return axios.get(`https://cloud.iexapis.com/stable/stock/googl/quote?token=${process.env.IEX_API_KEY}`)
            })
            .then(res => {
                let { symbol, open, latestPrice } = res.data;
                google = { symbol, open, latestPrice };
                return axios.get(`https://cloud.iexapis.com/stable/stock/msft/quote?token=${process.env.IEX_API_KEY}`)
            })
            .then(res => {
                let { symbol, open, latestPrice } = res.data;
                microsoft = { symbol, open, latestPrice };
                return axios.get(`https://cloud.iexapis.com/stable/stock/tsla/quote?token=${process.env.IEX_API_KEY}`)
            })
            .then(res => {
                let { symbol, open, latestPrice } = res.data;
                tesla = { symbol, open, latestPrice };
                return axios.get(`https://cloud.iexapis.com/stable/stock/yelp/quote?token=${process.env.IEX_API_KEY}`)
            })
            .then(res => {
                let { symbol, open, latestPrice } = res.data;
                yelp = { symbol, open, latestPrice };
                stocks.push(apple, facebook, google, microsoft, tesla, yelp);
                return stocks;
            })
            .then(stocks => dispatch(_loadInitialStocks(stocks)))
    }
)