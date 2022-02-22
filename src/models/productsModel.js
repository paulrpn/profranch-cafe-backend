const { ObjectId } = require('mongodb');
const connect = require('./connectionDB');

const createProduct = async (bodyData, productCost, productPrice, _id, timeStamp) => {
  const conn = await connect();
  const {
    productName, productImage, productIngredients, productQuantity,
  } = bodyData;

  const { insertedId } = await conn.collection('products').insertOne(
    {
      productName,
      productImage,
      productIngredients,
      productCost,
      productPrice,
      productQuantity,
      createdBy: _id,
      createdTime: timeStamp,
    },
  );

  return insertedId;
};

const getAllProducts = async () => {
  const conn = await connect();
  const query = await conn.collection('products')
    .find({})
    .sort({ productName: 1 })
    .toArray();
  return query;
};

const getProductByName = async (name) => {
  const conn = await connect();
  const query = await conn.collection('products')
    .find({ productName: { $regex: name } })
    .sort({ productName: 1 })
    .toArray();
  return query;
};

const getProductById = async (id) => {
  const conn = await connect();
  const query = await conn.collection('products').findOne({ _id: ObjectId(id) });
  return query;
};

const updateProduct = async (id, _id, bodyData, productCost, productPrice, timeStamp) => {
  const conn = await connect();
  const {
    productName, productImage, productIngredients, productQuantity,
  } = bodyData;

  const { modifiedCount } = await conn.collection('products').updateOne(
    { _id: ObjectId(id) },
    {
      $set:
        {
          productName,
          productImage,
          productIngredients,
          productCost,
          productPrice,
          productQuantity,
          updatedBy: _id,
          updatedTime: timeStamp,
        },
    },
  );

  return modifiedCount;
};

const deleteProduct = async (id) => {
  const conn = await connect();

  const { deletedCount } = await conn.collection('products')
    .deleteOne({ _id: ObjectId(id) });
  return deletedCount;
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductByName,
  getProductById,
  updateProduct,
  deleteProduct,
};
