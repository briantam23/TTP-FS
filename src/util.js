import axios from 'axios';


export const findStockNameById = (stocks, id) => (
    stocks.find(stock => stock.id === id).name
)

export const findFinishedTransactions = transactions => (
    transactions.filter(transaction => transaction.status === 'TRANSACTION')
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

export const postStock = (symbol, open, latestPrice) => {
    axios.post('/api/stocks', { symbol, openPrice: open, latestPrice });
}

export const getStockFromAPI = symbol => (
    axios.get(`https://cloud.iexapis.com/stable/stock/${symbol}/quote?token=${process.env.IEX_API_KEY}`)
)