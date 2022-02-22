const { ERROR_MSG_6 } = require('../utils/errorMessages');

const validateNewName = (productName) => {
  if (!productName || typeof (productName) !== 'string') {
    throw ERROR_MSG_6;
  }
  return true;
};

// const validateNewImage = (productImage) => {
//   if (!productImage || typeof (productImage) !== 'string') {
//     throw ERROR_MSG_6;
//   }
//   return true;
// };

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

module.exports = {
  validateNewName,
  // validateNewImage,
  validateNewIngredients,
  validateNewQuantity,
};