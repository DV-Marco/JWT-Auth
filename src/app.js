const express = require('express');
const morgan = require('morgan');

const app = express();
const auth = require('./controllers/auth.controller')

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/', auth);

module.exports = app;