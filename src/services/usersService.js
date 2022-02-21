const usersModel = require('../models/usersModel');
const { generateToken } = require('./authService');
const { ERROR_MSG_2, ERROR_MSG_3 } = require('../utils/errorMessages');

const {
  validateEmail,
  validatePassword,
} = require('./validateData');

const createUser = async (userName, userEmail, userPassword) => {
  // validateNewName(userName);
  // validateNewEmail(userEmail);
  // validateNewPassword(userPassword);

  const emailExists = await usersModel.getUserByEmail(userEmail);
  if (emailExists !== null) throw ERROR_MSG_2;

  const newUserId = await usersModel.createUser(userName, userEmail, userPassword);
  return {
    'ID do usuário': newUserId,
    'Nome do usuário': userName,
    'Email do usuário': userEmail,
    'Nível de acesso': 'usuário',
  };
};

const loginUser = async (userEmail, userPassword) => {
  validateEmail(userEmail);
  validatePassword(userPassword);

  const userFound = await usersModel.getUserByEmail(userEmail);
  if (!userFound || userFound.userPassword !== userPassword) throw ERROR_MSG_3;

  const { userPassword: _userPassword, ...userWithoutPassword } = userFound;
  const token = generateToken(userWithoutPassword);
  return token;
};

module.exports = {
  createUser,
  loginUser,
};
