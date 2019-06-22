const conn = require('../conn');


const Stock = conn.define('stock', {
    name: {
        type: conn.Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: true
        }
    }
})


module.exports = Stock;