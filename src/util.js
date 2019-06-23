import axios from 'axios';


export const findStockNameById = (stocks, id) => (
    stocks.find(stock => stock.id === id).name
)

export const findFinishedTransactions = (transactions, auth) => (
    transactions.filter(transaction => {
        return transaction.status === 'TRANSACTION' && transaction.userId === auth.id;
    })
)

export const findPendingTransaction = transactions => (
    transactions.find(transaction => transaction.status === 'CART')
)

export const findLineItemById = (cart, stock) => (
    cart.lineItems.find(lineItem => lineItem.stockId === stock.id)
)

export const filterStocks = stocks => (
    stocks.data.filter(stock => stock.symbol)
)

export const postStock = res => {
    let { symbol, open, latestPrice } = res.data;
    axios.post('/api/stocks', { symbol, openPrice: open, latestPrice });
}

export const getStockFromAPI = symbol => (
    axios.get(`https://cloud.iexapis.com/stable/stock/${symbol}/quote?token=${process.env.IEX_API_KEY}`)
)