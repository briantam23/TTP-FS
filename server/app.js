const express = require('express');
const app = express();
const path = require('path');
const { User } = require('./db').models;
const jwt = require('jwt-simple');


// Body parsing middleware
app.use(require('body-parser').json());

// Static file-serving middleware
app.use('/public', express.static(path.join(__dirname, '../public')));

// Sends our index.html (the "single page" of our SPA)
app.get('/', (req, res) => res.sendFile(path.join(__dirname, '../public/index.html')));

// Authenticates user
app.use((req, res, next) => {
    const token = req.headers.authorization;
    if(!token) return next();
    
    let id;
    try {
        id = jwt.decode(token, process.env.JWT_SECRET).id;
    }
    catch(ex) {
        return next({ status: 401 });
    }
    User.findByPk(id)
        .then(user => {
            req.user = user;
            next();
        })
        .catch(next);
})

// Routes that will be accessed via AJAX that are prepended 
// with /api so that they are isolated from our GET /* wildcard.
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/transactions', require('./routes/transactions'));
app.use('/api/stocks', require('./routes/stocks'));


// Error catching endware
app.use((err, req, res, next) => {
    console.log(err);
    // send back error status
    res.status(err.status || 500).end();
})


module.exports = app;