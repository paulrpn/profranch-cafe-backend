const ingredientsService = require('../services/ingredientsService');

const createIngredient = async (req, res, next) => {
  try {
    const bodyData = req.body;
    const userData = req.user;
    const newIngredient = await ingredientsService
      .createIngredient(bodyData, userData);

    return res.status(201).json({ Ingrediente: newIngredient });
  } catch (error) {
    return next(error);
  }
};

const getAllIngredients = async (_req, res) => {
  const allIngredients = await ingredientsService.getAllIngredients();
  res.status(200).json(allIngredients);
};

const getIngredientByName = async (req, res, next) => {
  try {
    const { name } = req.query;
    const result = await ingredientsService.getIngredientByName(name);

    return res.status(200).json(result);
  } catch (error) {
    return next(error);
  }
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

const updateIngredient = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userData = req.user;
    const bodyData = req.body;

    const updatedIngredient = await ingredientsService.updateIngredient(id, userData, bodyData);

    return res.status(200).json(updatedIngredient);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  createIngredient,
  getAllIngredients,
  getIngredientByName,
  getIngredientById,
  updateIngredient,
  // deleteIngredient,
};
