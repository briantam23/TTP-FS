const router = require('express').Router();
const { User, Transaction, LineItem, Stock } = require('../db').models;


//get users
router.get('/', (req, res, next) => {
    User.findAll()
        .then(users => res.send(users))
        .catch(next)
})

//get user by ID
router.get('/:userId', (req, res, next) => {
    User.findByPk(req.params.userId)
        .then(user => res.send(user))
        .catch(next)
})

//create user
router.post('/', (req, res, next) => {
    User.create(req.body)
        .then(user => res.send(user))
        .catch(next)
})

//update user
router.put('/:userId', (req, res, next) => {
    User.findByPk(req.params.userId)
        .then(user => user.update(req.body))
        .then(user => res.send(user))
        .catch(next)
})

//delete user
router.delete('/:userId', (req, res, next) => {
    User.destroy({
        where: { id: req.params.userId }
    })
        .then(err => {
            if (err === 0) return res.sendStatus(500);
            res.sendStatus(204);
        })
        .catch(next)
})

//get transactions by user ID
router.get('/:userId/transactions', (req, res, next) => {
    Transaction.findOne({ 
        where: { status: 'CART' },
        include: [{
            model: User,
            where: { id: req.params.userId }
        }] 
    })
        .then(res => res.data)
        .then(transactions => res.send(transactions))
})

//create line item
router.post('/:userId/transaction/:transactionId/lineItems', (req, res, next) => {
    LineItem.create({
        transactionId: req.params.transactionId,
        quantity: req.body.quantity,
        stockId: req.body.stockId,
        price: req.body.price
    })
        .then(lineItem => res.send(lineItem))
        .catch(next)
})

//update line item
router.put('/:userId/transaction/:transactionId/lineItems/:lineItemId', (req, res, next) => {
    LineItem.findByPk(req.params.lineItemId)
        .then(lineItem => lineItem.update(req.body))
        .then(lineItem => res.send(lineItem))
        .catch(next)
})

//delete line item
router.delete('/:userId/transaction/:transactionId/lineItems/:lineItemId', (req, res, next) => {
    LineItem.destroy({ 
        where: {
            transactionId: req.params.transactionId,
            id: req.params.lineItemId
        }
    })
        .then(() => res.sendStatus(204))
        .catch(next)
})

//update transaction
router.put('/:userId/transaction/:transactionId', (req, res, next) => {
    Transaction.findByPk(req.params.transactionId)
        .then(transaction => transaction.update({
            ...req.body, 
            userId: req.params.userId
        }))
        .then(transaction => res.send(transaction))
        .catch(next)
})


module.exports = router;