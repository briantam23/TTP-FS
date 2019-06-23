const conn = require('../conn');


const Stock = conn.define('stock', {
    symbol: {
        type: conn.Sequelize.STRING,
        unique: true,
        validate: {
            notEmpty: true
        }
    },
    openPrice: {
        type: conn.Sequelize.DECIMAL(10, 2)
    },
    latestPrice: {
        type: conn.Sequelize.DECIMAL(10, 2)
    }

})


module.exports = Stock;