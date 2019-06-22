const conn = require('../conn');


const Transaction = conn.define('transaction', {
    id: {
        type: conn.Sequelize.UUID,
        defaultValue: conn.Sequelize.UUIDV4,
        primaryKey: true
    },
    status: {
        type: conn.Sequelize.ENUM('CART', 'TRANSACTION'),
        allowNull: false,
        defaultValue: 'CART'
    }
})


module.exports = Transaction;