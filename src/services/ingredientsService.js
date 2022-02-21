const { ObjectId } = require('mongodb');
const ingredientsModel = require('../models/ingredientsModel');
const { ERROR_MSG_1, ERROR_MSG_9 } = require('../utils/errorMessages');

const {
  validateNewName,
  validateNewMeasureUnit,
  validateNewUnitPrice,
} = require('./validateIngredientData');

const createIngredient = async (bodyData, userData) => {
  const { ingredientName, measureUnit, unitPrice } = bodyData;
  const { _id, userName, userRole } = userData;
  const addDate = new Date();

  validateNewName(ingredientName);
  validateNewMeasureUnit(measureUnit);
  validateNewUnitPrice(unitPrice);

  if (userRole === 'user') throw ERROR_MSG_9;

  const newIngredientId = await ingredientsModel
    .createIngredient(ingredientName, measureUnit, unitPrice, _id, addDate);

  return {
    'ID do ingrediente': newIngredientId,
    'Nome do ingrediente': ingredientName,
    'Unidade de medida': measureUnit,
    'Preço unitário': unitPrice,
    'Cadastrado por:': userName,
    'Criado em:': addDate,
  };
};

const getAllIngredients = async () => {
  const allIngredients = await ingredientsModel.getAllIngredients();
  return allIngredients;
};

const getIngredientById = async (id) => {
  if (!ObjectId.isValid(id)) throw ERROR_MSG_1;
  const ingredient = await ingredientsModel.getIngredientById(id);
  if (!ingredient) throw ERROR_MSG_1;
  return ingredient;
};

module.exports = {
  createIngredient,
  getAllIngredients,
  getIngredientById,
  // updateIngredient,
  // deleteIngredient,
};
