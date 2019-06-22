const conn = require('./conn');
const Transaction = require('./models/Transaction');
const LineItem = require('./models/LineItem');
const Stock = require('./models/Stock');
const User = require('./models/User');


LineItem.belongsTo(Stock);
LineItem.belongsTo(Transaction);
Transaction.hasMany(LineItem);
Transaction.belongsTo(User);


const syncAndSeed = () => {
    let Foo, Bar, Baz, 
        transaction1, transaction2, transaction3, 
        lineItem1, lineItem2, lineItem3, lineItem4, lineItem5, lineItem6,
        Brian, Johnny, Mike;

    conn.sync({ force: true })
        .then(() => Promise.all([
            Stock.create({ name: 'Foo' }),
            Stock.create({ name: 'Bar' }),
            Stock.create({ name: 'Baz' })
        ]))
        .then(stocks => {
            [Foo, Bar, Baz] = stocks;
            return Promise.all([
                Transaction.create({ status: 'TRANSACTION' }),
                Transaction.create({ status: 'TRANSACTION' }),
                Transaction.create({ status: 'TRANSACTION' }),
            ])
        })
        .then(tranactions => {
            [transaction1, transaction2, transaction3] = tranactions;
            return Promise.all([
                LineItem.create({ quantity: 1 }),
                LineItem.create({ quantity: 2 }),
                LineItem.create({ quantity: 3 }),
                LineItem.create({ quantity: 4 }),
                LineItem.create({ quantity: 5 }),
                LineItem.create({ quantity: 6 })
            ])
        })
        .then(lineItems => {
            [lineItem1, lineItem2, lineItem3, lineItem4, lineItem5, lineItem6] = lineItems;
            return Promise.all([
                User.create({ name: 'Brian', email: 'b@gmail.com', password: 'Briantam23@' }),
                User.create({ name: 'Johnny', email: 'j@gmail.com', password: 'Johnny34&', balance: 6000 }),
                User.create({ name: 'Mike', email: 'm@gmail.com', password: 'Mike12#', balance: 4000 })
            ])
        })
        .then(users => {
            [Brian, Johnny, Mike] = users;
            Promise.all([
                lineItem1.setStock(Foo),
                lineItem2.setStock(Bar),
                lineItem3.setStock(Baz),
                lineItem4.setStock(Foo),
                lineItem5.setStock(Bar),
                lineItem6.setStock(Baz),
                lineItem1.setTransaction(transaction1),
                lineItem2.setTransaction(transaction2),
                lineItem3.setTransaction(transaction3),
                lineItem4.setTransaction(transaction2),
                lineItem5.setTransaction(transaction3),
                lineItem6.setTransaction(transaction3),
                transaction1.setUser(Brian),
                transaction2.setUser(Johnny),
                transaction3.setUser(Mike)
            ])
        })
}


module.exports = {
    syncAndSeed,
    models: {
        Transaction,
        LineItem,
        Stock,
        User
    },
    conn
}