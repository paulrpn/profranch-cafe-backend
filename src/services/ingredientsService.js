const { ObjectId } = require('mongodb');
const ingredientsModel = require('../models/ingredientsModel');
const { ERROR_MSG_1 } = require('../utils/errorMessages');

// const {
//   validateData,
// } = require('../utils/validateData');

const createIngredient = async (ingredientName, measureUnit, unitPrice) => {
  // validateNewName(name);
  // validateNewIngredients(ingredients);

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
