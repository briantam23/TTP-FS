const conn = require('../conn');


const Stock = conn.define('stock', {
    id: {
        type: conn.Sequelize.UUID,
        defaultValue: conn.Sequelize.UUIDV4,
        primaryKey: true
    },
    name: {
        type: conn.Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: true
        }
    },
    quantity: {
        type: conn.Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }
})


module.exports = Stock;