const { ObjectId } = require('mongodb');
const connect = require('./connectionDB');

const createIngredient = async (ingredientName, measureUnit, unitPrice) => {
  const conn = await connect();

  const { insertedId } = await conn.collection('ingredients').insertOne(
    {
      ingredientName,
      measureUnit,
      unitPrice,
      // userId: _id,
    },
  );

  return insertedId;
};

const getAllIngredients = async () => {
  const conn = await connect();
  const query = await conn.collection('ingredients').find({}).toArray();
  return query;
};

const getIngredientById = async (id) => {
  const conn = await connect();
  const query = await conn.collection('ingredients').findOne({ _id: ObjectId(id) });
  return query;
};

module.exports = {
  createIngredient,
  getAllIngredients,
  getIngredientById,
  // updateIngredient,
  // deleteIngredient,
};
