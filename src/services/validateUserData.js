const {
  ERROR_MSG_3,
  ERROR_MSG_6,
  ERROR_MSG_7,
  ERROR_MSG_8,
} = require('../utils/errorMessages');

const validateNewName = (userName) => {
  if (!userName || typeof (userName) !== 'string') {
    throw ERROR_MSG_6;
  }
  return true;
};

const validateNewEmail = (userEmail) => {
  const emailRegex = /^[a-z0-9\-_]+@[a-z]+\.[a-z]{2,}$/;

  if (!userEmail || typeof (userEmail) !== 'string') {
    throw ERROR_MSG_6;
  }
  if (emailRegex.test(userEmail) === false) {
    throw ERROR_MSG_7;
  }
  return true;
};

const validateNewPassword = (userPassword) => {
  if (!userPassword || typeof (userPassword) !== 'string') {
    throw ERROR_MSG_6;
  }
  if (userPassword.length < 6 || userPassword.length > 12) {
    throw ERROR_MSG_8;
  }
  return true;
};

const validateEmail = (userEmail) => {
  const emailRegex = /^[a-z0-9\-_]+@[a-z]+\.[a-z]{2,}$/;

  if (!userEmail || typeof (userEmail) !== 'string') {
    throw ERROR_MSG_6;
  }
  if (emailRegex.test(userEmail) === false) {
    throw ERROR_MSG_3;
  }
  return true;
};

const validatePassword = (userPassword) => {
  if (!userPassword || typeof (userPassword) !== 'string') {
    throw ERROR_MSG_6;
  }
  if (userPassword.length < 6 || userPassword.length > 12) {
    throw ERROR_MSG_3;
  }
  return true;
};

module.exports = {
  validateNewName,
  validateNewEmail,
  validateNewPassword,
  validateEmail,
  validatePassword,
};
