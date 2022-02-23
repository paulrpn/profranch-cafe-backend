const { ObjectId } = require('mongodb');
const productsModel = require('../models/productsModel');
const ingredientsModel = require('../models/ingredientsModel');

const {
  ERROR_MSG_1,
  ERROR_MSG_9,
  ERROR_MSG_11,
  ERROR_MSG_12,
} = require('../utils/errorMessages');

const {
  validateNewName,
  // validateNewImage,
  validateNewIngredients,
  validateNewQuantity,
  validateUpdateName,
  // validateUpdateImage,
  validateUpdateIngredients,
  validateUpdateQuantity,
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

const getProductsCost = async (userRole) => {
  if (userRole === 'user') throw ERROR_MSG_9;
  const allProducts = await productsModel.getProductsCost();
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

const updateProduct = async (id, userData, bodyData) => {
  if (!ObjectId.isValid(id)) throw ERROR_MSG_1;
  const {
    productName, productImage, productIngredients, productQuantity,
  } = bodyData;
  const { _id, userName, userRole } = userData;
  const timeStamp = new Date();

  validateUpdateName(productName);
  // validateUpdateImage(productImage);
  validateUpdateIngredients(productIngredients);
  validateUpdateQuantity(productQuantity);

  if (userRole === 'user') throw ERROR_MSG_9;

  const productCost = await ingredientsModel
    .consumeIngredients(productIngredients, productQuantity, _id, timeStamp);
  const productPrice = parseFloat((productCost + (productCost * 0.40)).toFixed(2), 10);

  const updateStatus = await productsModel
    .updateProduct(id, _id, bodyData, productCost, productPrice, timeStamp);

  if (updateStatus === 0) throw ERROR_MSG_12;

  return {
    'ID do produto': id,
    'Nome do produto': productName,
    'Imagem do produto': productImage,
    'Ingredientes do produto': productIngredients,
    'Custo do produto': productCost,
    'Preço do produto': productPrice,
    'Qtde do produto': productQuantity,
    'Atualizado por:': userName,
    'Atualizado em:': timeStamp,
  };
};

const deleteProduct = async (id, userRole) => {
  if (!ObjectId.isValid(id)) throw ERROR_MSG_1;
  if (userRole === 'user') throw ERROR_MSG_9;

  const deleteStatus = await productsModel.deleteProduct(id);
  if (deleteStatus === 0) throw ERROR_MSG_12;
  return null;
};

const updateProductImage = async (id, filename, userData) => {
  const { _id, userName, userRole } = userData;
  const timeStamp = new Date();
  const product = await productsModel.getProductById(id);
  const {
    productName, productIngredients, productCost, productPrice, productQuantity,
  } = product;

  const imageURL = `${'localhgetAllProductsost:3333/src/uploads/'}${filename}`;

  if (userRole === 'user') throw ERROR_MSG_9;
  const updateStatus = await productsModel.updateProductImage(id, _id, imageURL, timeStamp);

  if (updateStatus === 0) throw ERROR_MSG_12;

  return {
    'ID do produto': id,
    'Nome do produto': productName,
    'Imagem do produto': imageURL,
    'Ingredientes do produto': productIngredients,
    'Custo do produto': productCost,
    'Preço do produto': productPrice,
    'Qtde do produto': productQuantity,
    'Atualizado por:': userName,
    'Atualizado em:': timeStamp,
  };
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductsCost,
  getProductByName,
  getProductById,
  updateProduct,
  deleteProduct,
  updateProductImage,
};
