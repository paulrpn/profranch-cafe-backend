const express = require('express');

const usersRouter = express.Router();
const { createUser, loginUser } = require('../controllers/usersController');

usersRouter.post('/', createUser);
usersRouter.post('/login', loginUser);

module.exports = usersRouter;
