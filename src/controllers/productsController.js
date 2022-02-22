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

// const getIngredientByName = async (req, res, next) => {
//   try {
//     const { name } = req.query;
//     const result = await productsService.getIngredientByName(name);

//     return res.status(200).json(result);
//   } catch (error) {
//     return next(error);
//   }
// };

// const getIngredientById = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const ingredient = await productsService.getIngredientById(id);

//     return res.status(200).json(ingredient);
//   } catch (error) {
//     return next(error);
//   }
// };

// const updateIngredient = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const userData = req.user;
//     const bodyData = req.body;

//     const updatedIngredient = await productsService.updateIngredient(id, userData, bodyData);

//     return res.status(201).json({ 'Ingrediente atualizado com sucesso': updatedIngredient });
//   } catch (error) {
//     return next(error);
//   }
// };

// const deleteIngredient = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const { userRole } = req.user;
//     await productsService.deleteIngredient(id, userRole);

//     return res.status(200).send('Ingrediente excluído com sucesso!');
//   } catch (error) {
//     return next(error);
//   }
// };

module.exports = {
  createProduct,
  getAllProducts,
  // getProductByName,
  // getProductById,
  // updateIngredient,
  // deleteIngredient,
};
