const { ObjectId } = require('mongodb');
const ingredientsModel = require('../models/ingredientsModel');

const {
  ERROR_MSG_1,
  ERROR_MSG_9,
  ERROR_MSG_11,
} = require('../utils/errorMessages');

const {
  validateNewName,
  validateNewMeasureUnit,
  validateNewUnitPrice,
} = require('./validateIngredientData');

const createIngredient = async (bodyData, userData) => {
  const { ingredientName, measureUnit, unitPrice } = bodyData;
  const { _id, userName, userRole } = userData;
  const timeStamp = new Date();

  validateNewName(ingredientName);
  validateNewMeasureUnit(measureUnit);
  validateNewUnitPrice(unitPrice);

  if (userRole === 'user') throw ERROR_MSG_9;

  const newIngredientId = await ingredientsModel
    .createIngredient(ingredientName, measureUnit, unitPrice, _id, timeStamp);

  return {
    'ID do ingrediente': newIngredientId,
    'Nome do ingrediente': ingredientName,
    'Unidade de medida': measureUnit,
    'Preço unitário': unitPrice,
    'Cadastrado por:': userName,
    'Criado em:': timeStamp,
  };
};

const getAllIngredients = async () => {
  const allIngredients = await ingredientsModel.getAllIngredients();
  return allIngredients;
};

const getIngredientByName = async (name) => {
  const result = await ingredientsModel.getIngredientByName(name);
  if (!result) throw ERROR_MSG_11;
  return result;
};

const getIngredientById = async (id) => {
  if (!ObjectId.isValid(id)) throw ERROR_MSG_1;
  const ingredient = await ingredientsModel.getIngredientById(id);
  if (!ingredient) throw ERROR_MSG_1;
  return ingredient;
};

const updateIngredient = async (id, userData, bodyData) => {
  if (!ObjectId.isValid(id)) throw ERROR_MSG_1;
  const { ingredientName, measureUnit, unitPrice } = bodyData;
  const { _id, userName, userRole } = userData;
  const timeStamp = new Date();

  validateNewName(ingredientName);
  validateNewMeasureUnit(measureUnit);
  validateNewUnitPrice(unitPrice);

  if (userRole === 'user') throw ERROR_MSG_9;

  await ingredientsModel.updateIngredient(id, _id, bodyData, timeStamp);

  // if (updateStatus === 0) throw ERROR_MSG_7;

  return {
    'ID do ingrediente': id,
    'Nome do ingrediente': ingredientName,
    'Unidade de medida': measureUnit,
    'Preço unitário': unitPrice,
    'Atualizado por:': userName,
    'Atualizado em:': timeStamp,
  };
};

module.exports = {
  createIngredient,
  getAllIngredients,
  getIngredientByName,
  getIngredientById,
  updateIngredient,
  // deleteIngredient,
};
