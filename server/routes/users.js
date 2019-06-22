const router = require('express').Router();
const { User } = require('../db').models;


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


module.exports = router;