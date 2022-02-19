const express = require('express');
const bodyParser = require('body-parser');
// const errorHandler = require('../middlewares/errorHandler');
// const validateJWT = require('../middlewares/validateJWT');
// const path = require('path');
// const multer = require('multer');
// const storage = require('../middlewares/multerStorage');

const {
  getAllIngredients,
  getIngredientById,
  createIngredient,
  updateIngredient,
  deleteIngredient,
} = require('../controllers/ingredientsController');

const app = express();
// const upload = multer({ storage });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use('/images', express.static(path.join(__dirname, '..', 'uploads')));

app.get('/ingredients', getAllIngredients);
app.get('/ingredients/:id', getIngredientById);
app.post('/ingredients', /* validateJWT, */ createIngredient);
app.put('/ingredients/:id', /* validateJWT, */ updateIngredient);
app.delete('/ingredients/:id', /* validateJWT, */ deleteIngredient);

// app.get('/components', getAllComponents);
// app.get('/components/:id', getComponentById);
// app.post('/components', /* validateJWT, */ createComponent);
// app.put('/components/:id', /* validateJWT, */ updateComponent);
// app.delete('/components/:id', /* validateJWT, */ deleteComponent);

// app.get('/products', getAllProducts);
// app.get('/products/:id', getProductById);
// app.get('/products/checksale/:id', getProductById);
// app.post('/products', /* validateJWT, */ createProduct);
// app.put('/products/:id', /* validateJWT, */ updateProduct);
// app.delete('/products/:id', /* validateJWT, */ deleteProduct);
// app.put('/products/:id/image', /* validateJWT, */ upload.single('image'), updateProductImage);

// app.post('/login', loginUser);

// app.use(errorHandler);

module.exports = app;
