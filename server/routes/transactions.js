const router = require('express').Router();
const { Transaction, LineItem } = require('../db').models;
const { conn } = require('../db');


//get all transactions
router.get('/', async (req, res, next) => {
    try {
        let cart = await Transaction.findOne({ 
            where: { status: 'CART' }
        })
        if(!cart) {
            cart = await Transaction.create({ where: { status: 'CART' } });
        }
        const transactions = await Transaction.findAll({
            include: [ LineItem ],
            order: [['createdAt', 'DESC']]
        })
        res.send(transactions);
    }
    catch(ex) {
        next(ex)
    }
})


module.exports = router;