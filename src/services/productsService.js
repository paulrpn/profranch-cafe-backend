const { ObjectId } = require('mongodb');
const productsModel = require('../models/productsModel');
const ingredientsModel = require('../models/ingredientsModel');

const {
  ERROR_MSG_1,
  ERROR_MSG_9,
  ERROR_MSG_11,
  // ERROR_MSG_12,
} = require('../utils/errorMessages');

const {
  validateNewName,
  // validateNewImage,
  validateNewIngredients,
  validateNewQuantity,
} = require('./validateProductData');

const createProduct = async (bodyData, userData) => {
  const {
    productName, productImage, productIngredients, productQuantity,
  } = bodyData;
  const { _id, userName, userRole } = userData;
  const timeStamp = new Date();

  validateNewName(productName);
  // validateNewImage(productImage);
  validateNewIngredients(productIngredients);
  validateNewQuantity(productQuantity);

  if (userRole === 'user') throw ERROR_MSG_9;

  const productCost = await ingredientsModel
    .consumeIngredients(productIngredients, productQuantity, _id, timeStamp);
  const productPrice = parseFloat((productCost + (productCost * 0.40)).toFixed(2), 10);

  const newProductId = await productsModel
    .createProduct(bodyData, productCost, productPrice, _id, timeStamp);

  return {
    'ID do produto': newProductId,
    'Nome do produto': productName,
    'Imagem do produto': productImage,
    'Ingredientes do produto': productIngredients,
    'Custo do produto': productCost,
    'Preço do produto': productPrice,
    'Qtde do produto': productQuantity,
    'Cadastrado por:': userName,
    'Criado em:': timeStamp,
  };
};

const getAllProducts = async () => {
  const allProducts = await productsModel.getAllProducts();
  return allProducts;
};

const getProductByName = async (name) => {
  const result = await productsModel.getProductByName(name);
  if (!result) throw ERROR_MSG_11;
  return result;
};

const getProductById = async (id) => {
  if (!ObjectId.isValid(id)) throw ERROR_MSG_1;
  const product = await productsModel.getProductById(id);
  if (!product) throw ERROR_MSG_1;
  return product;
};

// const updateIngredient = async (id, userData, bodyData) => {
//   if (!ObjectId.isValid(id)) throw ERROR_MSG_1;
//   const {
//     ingredientName, measureUnit, unitPrice, quantity,
//   } = bodyData;
//   const { _id, userName, userRole } = userData;
//   const timeStamp = new Date();

//   validateNewName(ingredientName);
//   validateNewMeasureUnit(measureUnit);
//   validateNewUnitPrice(unitPrice);
//   validateNewQuantity(quantity);

//   if (userRole === 'user') throw ERROR_MSG_9;

//   const updateStatus = await productsModel.updateIngredient(id, _id, bodyData, timeStamp);

//   if (updateStatus === 0) throw ERROR_MSG_12;

//   return {
//     'ID do ingrediente': id,
//     'Nome do ingrediente': ingredientName,
//     'Unidade de medida': measureUnit,
//     'Preço unitário': unitPrice,
//     'Qtde do ingrediente': quantity,
//     'Atualizado por:': userName,
//     'Atualizado em:': timeStamp,
//   };
// };

// const deleteIngredient = async (id, userRole) => {
//   if (!ObjectId.isValid(id)) throw ERROR_MSG_1;
//   if (userRole === 'user') throw ERROR_MSG_9;

//   const deleteStatus = await productsModel.deleteIngredient(id);
//   if (deleteStatus === 0) throw ERROR_MSG_12;
//   return null;
// };

module.exports = {
  createProduct,
  getAllProducts,
  getProductByName,
  getProductById,
  // updateIngredient,
  // deleteIngredient,
};
