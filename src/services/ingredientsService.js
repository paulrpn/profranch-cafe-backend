const { ObjectId } = require('mongodb');
const ingredientsModel = require('../models/ingredientsModel');

const ERROR_MSG = {
  status: 400,
  message: 'Código do ingrediente inválido ou não econtrado',
};

// const {
//   validateData,
// } = require('../utils/validateData');

const createIngredient = async (ingredientName, measureUnit, unitPrice) => {
  // validateNewName(name);
  // validateNewIngredients(ingredients);
  // validateNewPreparation(preparation);

  const newIngredientId = await ingredientsModel
    .createIngredient(ingredientName, measureUnit, unitPrice);

  return {
    _id: newIngredientId,
    ingredientName,
    measureUnit,
    unitPrice,
    // userId: _id,
  };
};

const getAllIngredients = async () => {
  const allIngredients = await ingredientsModel.getAllIngredients();
  return allIngredients;
};

const getIngredientById = async (id) => {
  if (!ObjectId.isValid(id)) throw ERROR_MSG;
  const ingredient = await ingredientsModel.getIngredientById(id);
  if (!ingredient) throw ERROR_MSG;
  return ingredient;
};

module.exports = {
  createIngredient,
  getAllIngredients,
  getIngredientById,
  // updateIngredient,
  // deleteIngredient,
};
