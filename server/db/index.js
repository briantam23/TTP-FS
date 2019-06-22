const conn = require('./conn');
const Stock = require('./models/Stock');
const User = require('./models/User');


Stock.belongsTo(User);


const syncAndSeed = () => {
    let Foo, Bar, Baz, Brian, Johnny, Mike;

    conn.sync({ force: true })
        .then(() => Promise.all([
            Stock.create({ name: 'Foo', quantity: 1 }),
            Stock.create({ name: 'Bar', quantity: 2 }),
            Stock.create({ name: 'Baz', quantity: 3 })
        ]))
        .then(stocks => {
            [Foo, Bar, Baz] = stocks;
            return Promise.all([
                User.create({ name: 'Brian', email: 'b@gmail.com', password: 'b' }),
                User.create({ name: 'Johnny', email: 'j@gmail.com', password: 'j', balance: 6000 }),
                User.create({ name: 'Mike', email: 'm@gmail.com', password: 'm', balance: 4000 })
            ])
        })
        .then(users => {
            [Brian, Johnny, Mike] = users;
            Promise.all([
                Foo.setUser(Brian),
                Bar.setUser(Johnny),
                Baz.setUser(Mike)
            ])
        })
}


module.exports = {
    syncAndSeed,
    models: {
        Stock,
        User
    },
    conn
}