const express = require('express');
const bodyParser = require('body-parser');
const errorHandler = require('../middlewares/errorHandler');
// const validateJWT = require('../middlewares/validateJWT');
// const path = require('path');
// const multer = require('multer');
// const storage = require('../middlewares/multerStorage');

const {
  createIngredient,
  getAllIngredients,
  getIngredientById,
  // updateIngredient,
  // deleteIngredient,
} = require('../controllers/ingredientsController');

const app = express();
// const upload = multer({ storage });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use('/images', express.static(path.join(__dirname, '..', 'uploads')));

app.post('/ingredients', /* validateJWT, */ createIngredient);
app.get('/ingredients', getAllIngredients);
app.get('/ingredients/:id', getIngredientById);
// app.put('/ingredients/:id', /* validateJWT, */ updateIngredient);
// app.delete('/ingredients/:id', /* validateJWT, */ deleteIngredient);

// app.post('/components', /* validateJWT, */ createComponent);
// app.get('/components', getAllComponents);
// app.get('/components/:id', getComponentById);
// app.put('/components/:id', /* validateJWT, */ updateComponent);
// app.delete('/components/:id', /* validateJWT, */ deleteComponent);

// app.post('/products', /* validateJWT, */ createProduct);
// app.get('/products', getAllProducts);
// app.get('/products/:id', getProductById);
// app.get('/products/checksale/:id', getProductById);
// app.put('/products/:id', /* validateJWT, */ updateProduct);
// app.delete('/products/:id', /* validateJWT, */ deleteProduct);
// app.put('/products/:id/image', /* validateJWT, */ upload.single('image'), updateProductImage);

// app.post('/login', loginUser);

app.use(errorHandler);

module.exports = app;
