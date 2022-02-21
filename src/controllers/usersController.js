const usersService = require('../services/usersService');

const createUser = async (req, res, next) => {
  try {
    const { userName, userEmail, userPassword } = req.body;
    const newUser = await usersService.createUser(userName, userEmail, userPassword);

    return res.status(201).json({ user: newUser });
  } catch (error) {
    return next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { userEmail, userPassword } = req.body;
    const newToken = await usersService.loginUser(userEmail, userPassword);

    return res.status(200).json({ 'Acesso Autorizado - WebToken': newToken });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  createUser,
  loginUser,
};
