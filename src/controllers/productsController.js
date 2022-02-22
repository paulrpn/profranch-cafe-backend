const productsService = require('../services/productsService');

const createProduct = async (req, res, next) => {
  try {
    const bodyData = req.body;
    const userData = req.user;

    const newProduct = await productsService
      .createProduct(bodyData, userData);

    return res.status(201).json({ Produto: newProduct });
  } catch (error) {
    return next(error);
  }
};

const getAllProducts = async (_req, res) => {
  const allProducts = await productsService.getAllProducts();
  res.status(200).json(allProducts);
};

const getProductByName = async (req, res, next) => {
  try {
    const { name } = req.query;
    const result = await productsService.getProductByName(name);

    return res.status(200).json(result);
  } catch (error) {
    return next(error);
  }
};

const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await productsService.getProductById(id);

    return res.status(200).json(product);
  } catch (error) {
    return next(error);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userData = req.user;
    const bodyData = req.body;

    const updatedProduct = await productsService.updateProduct(id, userData, bodyData);

    return res.status(201).json({ 'Produto atualizado com sucesso': updatedProduct });
  } catch (error) {
    return next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { userRole } = req.user;

    await productsService.deleteProduct(id, userRole);

    return res.status(200).send('Produto excluído com sucesso!');
  } catch (error) {
    return next(error);
  }
};

const updateProductImage = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { filename } = req.file;
    const userData = req.user;

    const updatedProduct = await productsService.updateProductImage(id, filename, userData);

    return res.status(200).json({ 'Imagem inserida com sucesso no produto': updatedProduct });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductByName,
  getProductById,
  updateProduct,
  deleteProduct,
  updateProductImage,
};
