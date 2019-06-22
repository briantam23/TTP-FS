export const findStockNameById = (stocks, id) => (
    stocks.find(stock => stock.id === id).name
)

export const findFinishedTransactions = transactions => (
    transactions.filter(transaction => transaction.status === 'TRANSACTION')
)