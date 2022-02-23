const express = require('express');

const productsRouter = express.Router();
const multer = require('multer');
const storage = require('../middlewares/multerStorage');
const validateJWT = require('../middlewares/validateJWT');

const upload = multer({ storage });

const {
  createProduct,
  getAllProducts,
  getProductsCost,
  getProductByTag,
  checkProductForSale,
  getProductById,
  updateProduct,
  updateProductImage,
  deleteProduct,
} = require('../controllers/productsController');

productsRouter.post('/', validateJWT, createProduct);
productsRouter.get('/', validateJWT, getAllProducts);
productsRouter.get('/report', validateJWT, getProductsCost);
productsRouter.get('/salecheck', validateJWT, checkProductForSale);
productsRouter.get('/search', validateJWT, getProductByTag);
productsRouter.get('/:id', validateJWT, getProductById);
productsRouter.put('/:id', validateJWT, updateProduct);
productsRouter.put('/:id/image', validateJWT, upload.single('image'), updateProductImage);
productsRouter.delete('/:id', validateJWT, deleteProduct);

module.exports = productsRouter;
