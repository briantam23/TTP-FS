const router = require('express').Router();
const { Stock } = require('../db').models;


//get stocks
router.get('/', (req, res, next) => {
    Stock.findAll()
        .then(stocks => res.send(stocks))
        .catch(next)
})

//get stock by ID
router.get('/:stockId', (req, res, next) => {
    Stock.findByPk(req.params.stockId)
        .then(stock => res.send(stock))
        .catch(next)
})

//create stock
router.post('/', (req, res, next) => {
    Stock.create(req.body)
        .then(stock => res.send(stock))
        .catch(next)
})

//update stock
router.put('/:stockId', (req, res, next) => {
    Stock.findByPk(req.params.stockId)
        .then(stock => stock.update(req.body))
        .then(stock => res.send(stock))
        .catch(next)
})

//delete stock
router.delete('/:stockId', (req, res, next) => {
    Stock.destroy({
        where: { id: req.params.stockId }
    })
        .then(err => {
            if (err === 0) return res.sendStatus(500);
            res.sendStatus(204);
        })
        .catch(next)
})


module.exports = router;