const router = require('express').Router();
const { User } = require('../db').models;
const jwt = require('jwt-simple');


// Authenticates user
router.get('/', (req, res, next) => {
    if(!req.user) return next({ status: 401 });

    res.send(req.user);
})

// Creates user
router.post('/', (req, res, next) => {
    const { email, password } = req.body;
    User.findOne({ where: { email, password } })
        .then(user => {
            if(!user) return next({ status: 401 });
            
            const token = jwt.encode({ id: user.id }, process.env.JWT_SECRET);
            res.send({ token });
        })
        .catch(next)
})


module.exports = router;