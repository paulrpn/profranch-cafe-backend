// const { ObjectId } = require('mongodb');
const ingredientsModel = require('../models/ingredientsModel');

// const {
//   validateData,
// } = require('../utils/validateData');

const createIngredient = async (name) => {
  // validateNewName(name);
  // validateNewIngredients(ingredients);
  // validateNewPreparation(preparation);

  const newIngredientId = await ingredientsModel.createIngredient(name);

  return {
    _id: newIngredientId,
    name,
    // userId: _id,
  };
};

module.exports = {
  createIngredient,
  // getAllIngredients,
  // getIngredientById,
  // updateIngredient,
  // deleteIngredient,
};
