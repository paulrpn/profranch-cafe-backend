const { ERROR_MSG_6 } = require('../utils/errorMessages');

const validateNewName = (productName) => {
  if (!productName || typeof (productName) !== 'string') {
    throw ERROR_MSG_6;
  }
  return true;
};

const validateNewIngredients = (productIngredients) => {
  if (!productIngredients || typeof (productIngredients) !== 'object') {
    throw ERROR_MSG_6;
  }
  return true;
};

const validateNewQuantity = (productQuantity) => {
  if (!productQuantity || typeof (productQuantity) !== 'number') {
    throw ERROR_MSG_6;
  }
  return true;
};

const validateUpdateName = (productName) => {
  if (!productName || typeof (productName) !== 'string') {
    throw ERROR_MSG_6;
  }
  return true;
};

const validateUpdateIngredients = (productIngredients) => {
  if (!productIngredients || typeof (productIngredients) !== 'object') {
    throw ERROR_MSG_6;
  }
  return true;
};

const validateUpdateQuantity = (productQuantity) => {
  if (!productQuantity || typeof (productQuantity) !== 'number') {
    throw ERROR_MSG_6;
  }
  return true;
};

module.exports = {
  validateNewName,
  validateNewIngredients,
  validateNewQuantity,
  validateUpdateName,
  validateUpdateIngredients,
  validateUpdateQuantity,
};
