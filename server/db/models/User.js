const conn = require('../conn');


const User = conn.define('user', {
    id: {
        type: conn.Sequelize.UUID,
        defaultValue: conn.Sequelize.UUIDV4,
        primaryKey: true
    },
    name: {
        type: conn.Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    email: {
        type: conn.Sequelize.STRING,
        unique: true,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    password: {
        type: conn.Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    balance: {
        type: conn.Sequelize.DECIMAL(10, 2),
        defaultValue: 5000
    }
})


module.exports = User;