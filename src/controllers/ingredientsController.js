const ingredientsService = require('../services/ingredientsService');

const createIngredient = async (req, res, next) => {
  try {
    const { ingredientName, measureUnit, unitPrice } = req.body;
    // const { _id } = req.user;
    const newIngredient = await ingredientsService
      .createIngredient(ingredientName, measureUnit, unitPrice);

    return res.status(201).json({ recipe: newIngredient });
  } catch (error) {
    return next(error);
  }
};

const getAllIngredients = async (_req, res) => {
  const allIngredients = await ingredientsService.getAllIngredients();
  res.status(200).json(allIngredients);
};

const getIngredientById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const ingredient = await ingredientsService.getIngredientById(id);

    return res.status(200).json(ingredient);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  createIngredient,
  getAllIngredients,
  getIngredientById,
  // updateIngredient,
  // deleteIngredient,
};
