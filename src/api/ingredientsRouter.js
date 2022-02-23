const express = require('express');

const ingredientsRouter = express.Router();
const validateJWT = require('../middlewares/validateJWT');

const {
  createIngredient,
  getAllIngredients,
  getIngredientByTag,
  getIngredientById,
  updateIngredient,
  deleteIngredient,
} = require('../controllers/ingredientsController');

ingredientsRouter.post('/', validateJWT, createIngredient);
ingredientsRouter.get('/', validateJWT, getAllIngredients);
ingredientsRouter.get('/search', validateJWT, getIngredientByTag);
ingredientsRouter.get('/:id', validateJWT, getIngredientById);
ingredientsRouter.put('/:id', validateJWT, updateIngredient);
ingredientsRouter.delete('/:id', validateJWT, deleteIngredient);

module.exports = ingredientsRouter;
