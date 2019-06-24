const conn = require('../conn');


const LineItem = conn.define('lineItem', {
    quantity: {
        type: conn.Sequelize.INTEGER,
        defaultValue: 1
    },
    price: {
        type: conn.Sequelize.DECIMAL(10, 2)
    }
})


module.exports = LineItem;