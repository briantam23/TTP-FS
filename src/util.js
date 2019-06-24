import axios from 'axios';


export const findStockNameById = (stocks, id) => (
    stocks.find(stock => stock.id === id).symbol
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

const findCurrentPriceBySymbol = (stocks, symbol) => (
    stocks.find(stock => stock.symbol === symbol).latestPrice
)

export const findCurrentPriceById = (stocks, id) => (
    Number(stocks.find(stock => stock.id === id).latestPrice)
)

export const findCartTotal = cart => {
    if(cart.lineItems[0]) {
        return cart.lineItems.reduce((acc, curVal) => {
            return acc += curVal.quantity * curVal.price;
        }, 0)
    }
    else return 0;
}

export const findOpenPrice = (stocks, symbol) => (
    stocks.find(stock => stock.symbol === symbol).openPrice
)

export const findTotalsByStock = (transactions, stocks, auth) => {
    const stockSet = [];
    const stockSymbols = [];
    let currentPrice, openPrice, stockSymbol;

    findFinishedTransactions(transactions, auth).forEach(transaction => {

        transaction.lineItems.forEach(lineItem => {

            const { stockId, id, quantity } = lineItem;
            stockSymbol = findStockNameById(stocks, stockId);
            
            if(stockSymbols.indexOf(stockSymbol) === -1) {
                stockSymbols.push(stockSymbol);
                currentPrice = Number(findCurrentPriceBySymbol(stocks, stockSymbol));
                openPrice = Number(findOpenPrice(stocks, stockSymbol));
                stockSet.push({ id, symbol: stockSymbol, quantity, currentPrice, openPrice });
            }
            else {
                stockSet
                    .filter(_lineItem => _lineItem.symbol === stockSymbol)
                    .map(_lineItem => _lineItem.quantity += quantity)
            }
        })
    })
    return stockSet;
}

export const findPortfolioValue = stockSet => (
    stockSet.reduce((acc, curVal) => acc += curVal.quantity * curVal.currentPrice, 0).toFixed(2)
)

export const getPerformanceColor = (currentPrice, openPrice, style) => {
    if(currentPrice < openPrice) return style.red;
    else if(currentPrice === openPrice) return style.grey;
    else return style.green;
}

export const getDate = transaction => (
    transaction.updatedAt.slice(0, 10)
)

export const getEasternTime = transaction => (
    transaction.updatedAt.slice(11, 13) - 4 + transaction.updatedAt.slice(13, 16)
)

export const findCartCount = cartOrder => (
    cartOrder.lineItems.reduce((acc, cur) => acc += cur.quantity, 0)
)