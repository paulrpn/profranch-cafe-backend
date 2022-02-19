const ingredientsService = require('../services/ingredientsService');

const createIngredient = async (req, res, next) => {
  try {
    const { name } = req.body;
    // const { _id } = req.user;
    const newIngredient = await ingredientsService.createIngredient(name);

    return res.status(201).json({ recipe: newIngredient });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  createIngredient,
  // getAllIngredients,
  // getIngredientById,
  // updateIngredient,
  // deleteIngredient,
};
