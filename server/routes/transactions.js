const router = require('express').Router();
const { Transaction, LineItem } = require('../db').models;
const { conn } = require('../db');


//get all transactions
router.get('/', (req, res, next) => {
    Transaction.findAll({
        include: [ LineItem ],
        order: [['createdAt', 'DESC']]
    })
        .then(transactions => res.send(transactions))
        .catch(next)
})


module.exports = router;