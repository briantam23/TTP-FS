const express = require('express');
const app = express();
const path = require('path');


// Body parsing middleware
app.use(require('body-parser').json());

// Static file-serving middleware
app.use('/public', express.static(path.join(__dirname, '../public')));

// Sends our index.html (the "single page" of our SPA)
app.get('/', (req, res) => res.sendFile(path.join(__dirname, '../public/index.html')));

// Error catching endware
app.use((err, req, res, next) => {
    console.log(err);
    // send back error status
    res.status(err.status || 500).end();
})


module.exports = app;