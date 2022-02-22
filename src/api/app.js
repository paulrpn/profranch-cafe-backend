const express = require('express');
const bodyParser = require('body-parser');
const errorHandler = require('../middlewares/errorHandler');
const validateJWT = require('../middlewares/validateJWT');
const usersRouter = require('./usersRouter');
const ingredientsRouter = require('./ingredientsRouter');
// const path = require('path');
// const multer = require('multer');
// const storage = require('../middlewares/multerStorage');

const {
  createProduct,
  // getAllProducts,
  // getProductByName,
  // getProductById,
} = require('../controllers/productsController');

const app = express();
// const upload = multer({ storage });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use('/images', express.static(path.join(__dirname, '..', 'uploads')));

app.use('/users', usersRouter);
app.use('/ingredients', ingredientsRouter);

app.post('/products', validateJWT, createProduct);
// app.get('/products', validateJWT, getAllProducts);
// app.get('/products/search', validateJWT, getProductByName);
// app.get('/products/:id', validateJWT, getProductById);
// app.put('/products/:id', /* validateJWT, */ updateProduct);
// app.delete('/products/:id', /* validateJWT, */ deleteProduct);
// app.put('/products/:id/image', /* validateJWT, */ upload.single('image'), updateProductImage);

app.use(errorHandler);

module.exports = app;
