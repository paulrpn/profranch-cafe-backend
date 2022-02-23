const { ObjectId } = require('mongodb');
const ingredientsModel = require('../models/ingredientsModel');

const {
  ERROR_MSG_1,
  ERROR_MSG_9,
  ERROR_MSG_11,
  ERROR_MSG_12,
} = require('../utils/errorMessages');

const {
  validateNewName,
  validateNewMeasureUnit,
  validateNewUnitPrice,
  validateNewQuantity,
} = require('./validateIngredientData');

const createIngredient = async (bodyData, userData) => {
  const {
    ingredientName, measureUnit, unitPrice, quantity,
  } = bodyData;
  const { _id, userName, userRole } = userData;
  const timeStamp = new Date();

  validateNewName(ingredientName);
  validateNewMeasureUnit(measureUnit);
  validateNewUnitPrice(unitPrice);
  validateNewQuantity(quantity);

  if (userRole === 'user') throw ERROR_MSG_9;

  const newIngredientId = await ingredientsModel
    .createIngredient(bodyData, _id, timeStamp);

  return {
    'ID do ingrediente': newIngredientId,
    'Nome do ingrediente': ingredientName,
    'Unidade de medida': measureUnit,
    'Preço unitário': unitPrice,
    'Qtde do ingrediente': quantity,
    'Cadastrado por:': userName,
    'Criado em:': timeStamp,
  };
};

const getAllIngredients = async () => {
  const allIngredients = await ingredientsModel.getAllIngredients();
  return allIngredients;
};

const getIngredientByTag = async (tag) => {
  const result = await ingredientsModel.getIngredientByTag(tag);
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
  const {
    ingredientName, measureUnit, unitPrice, quantity,
  } = bodyData;
  const { _id, userName, userRole } = userData;
  const timeStamp = new Date();

  validateNewName(ingredientName);
  validateNewMeasureUnit(measureUnit);
  validateNewUnitPrice(unitPrice);
  validateNewQuantity(quantity);

  if (userRole === 'user') throw ERROR_MSG_9;

  const updateStatus = await ingredientsModel.updateIngredient(id, _id, bodyData, timeStamp);

  if (updateStatus === 0) throw ERROR_MSG_12;

  return {
    'ID do ingrediente': id,
    'Nome do ingrediente': ingredientName,
    'Unidade de medida': measureUnit,
    'Preço unitário': unitPrice,
    'Qtde do ingrediente': quantity,
    'Atualizado por:': userName,
    'Atualizado em:': timeStamp,
  };
};

const deleteIngredient = async (id, userRole) => {
  if (!ObjectId.isValid(id)) throw ERROR_MSG_1;
  if (userRole === 'user') throw ERROR_MSG_9;

  const deleteStatus = await ingredientsModel.deleteIngredient(id);
  if (deleteStatus === 0) throw ERROR_MSG_12;
  return null;
};

module.exports = {
  createIngredient,
  getAllIngredients,
  getIngredientByTag,
  getIngredientById,
  updateIngredient,
  deleteIngredient,
};
