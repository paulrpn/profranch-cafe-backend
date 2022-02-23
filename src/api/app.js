const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const errorHandler = require('../middlewares/errorHandler');
const usersRouter = require('./usersRouter');
const ingredientsRouter = require('./ingredientsRouter');
const productsRouter = require('./productsRouter');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/images', express.static(path.join(__dirname, '..', 'uploads')));

app.use('/users', usersRouter);
app.use('/ingredients', ingredientsRouter);
app.use('/products', productsRouter);

app.use(errorHandler);

module.exports = app;
