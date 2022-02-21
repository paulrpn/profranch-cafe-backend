const { ERROR_MSG_6, ERROR_MSG_10 } = require('../utils/errorMessages');

const validateNewName = (ingredientName) => {
  if (!ingredientName || typeof (ingredientName) !== 'string') {
    throw ERROR_MSG_6;
  }
  return true;
};

const validateNewMeasureUnit = (measureUnit) => {
  if (!measureUnit || typeof (measureUnit) !== 'string') {
    throw ERROR_MSG_6;
  }
  if (measureUnit !== 'litro' && measureUnit !== 'kilo' && measureUnit !== 'unidade') {
    throw ERROR_MSG_10;
  }
  return true;
};

const validateNewUnitPrice = (unitPrice) => {
  if (!unitPrice || typeof (unitPrice) !== 'number') {
    throw ERROR_MSG_6;
  }
  return true;
};

module.exports = {
  validateNewName,
  validateNewMeasureUnit,
  validateNewUnitPrice,
};
