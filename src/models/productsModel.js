const { ObjectId } = require('mongodb');
const connect = require('./connectionDB');

const createProduct = async (bodyData, productCost, productPrice, _id, timeStamp) => {
  const conn = await connect();
  const { productName, productIngredients, productQuantity } = bodyData;

  const { insertedId } = await conn.collection('products').insertOne(
    {
      productName,
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

const getProductsCost = async () => {
  const conn = await connect();
  const query = await conn.collection('products')
    .find({}, { projection: { _id: 0, productName: 1, productCost: 1 } })
    .sort({ productName: 1 })
    .toArray();
  return query;
};

const getProductByName = async (product) => {
  const conn = await connect();
  const query = await conn.collection('products').findOne({ productName: product });
  return query;
};

const getProductByTag = async (tag) => {
  const conn = await connect();
  const query = await conn.collection('products')
    .find({ productName: { $regex: tag } })
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
  const { productName, productIngredients, productQuantity } = bodyData;

  const { modifiedCount } = await conn.collection('products').updateOne(
    { _id: ObjectId(id) },
    {
      $set:
        {
          productName,
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

const updateProductImage = async (id, _id, imageURL, timeStamp) => {
  const conn = await connect();

  const { modifiedCount } = await conn.collection('products')
    .updateOne(
      { _id: ObjectId(id) },
      { $set: { productImage: imageURL, updatedBy: _id, updatedTime: timeStamp } },
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
  getProductsCost,
  getProductByName,
  getProductByTag,
  getProductById,
  updateProduct,
  updateProductImage,
  deleteProduct,
};
