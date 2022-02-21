const { ERROR_MSG_3, ERROR_MSG_6 } = require('../utils/errorMessages');

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
  if (userPassword.length < 8 && userPassword.length > 12) {
    throw ERROR_MSG_3;
  }
  return true;
};

module.exports = {
  validateEmail,
  validatePassword,
};
