const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const multer = require('multer');
const usersRouter = require('./usersRouter');
const errorHandler = require('../middlewares/errorHandler');
const validateJWT = require('../middlewares/validateJWT');
const storage = require('../middlewares/multerStorage');
const ingredientsRouter = require('./ingredientsRouter');

const {
  createProduct,
  getAllProducts,
  getProductsCost,
  getProductByName,
  getProductById,
  updateProduct,
  deleteProduct,
  updateProductImage,
} = require('../controllers/productsController');

const app = express();
const upload = multer({ storage });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/images', express.static(path.join(__dirname, '..', 'uploads')));

app.use('/users', usersRouter);
app.use('/ingredients', ingredientsRouter);

app.post('/products', validateJWT, createProduct);
app.get('/products', validateJWT, getAllProducts);
app.get('/products/report', validateJWT, getProductsCost);
app.get('/products/search', validateJWT, getProductByName);
app.get('/products/:id', validateJWT, getProductById);
app.put('/products/:id', validateJWT, updateProduct);
app.delete('/products/:id', validateJWT, deleteProduct);
app.put('/products/:id/image', validateJWT, upload.single('image'), updateProductImage);

app.use(errorHandler);

module.exports = app;
