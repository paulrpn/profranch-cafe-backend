const { ObjectId } = require('mongodb');
const connect = require('./connectionDB');

const createIngredient = async (ingredientName, measureUnit, unitPrice, _id, addDate) => {
  const conn = await connect();

  const { insertedId } = await conn.collection('ingredients').insertOne(
    {
      ingredientName,
      measureUnit,
      unitPrice,
      createdBy: _id,
      createdTime: addDate,
    },
  );

  return insertedId;
};

const getAllIngredients = async () => {
  const conn = await connect();
  const query = await conn.collection('ingredients')
    .find({})
    .sort({ ingredientName: 1 })
    .toArray();
  return query;
};

const getIngredientByName = async (name) => {
  const conn = await connect();
  const query = await conn.collection('ingredients')
    .find({ ingredientName: { $regex: name } })
    .sort({ ingredientName: 1 })
    .toArray();
  return query;
};

const getIngredientById = async (id) => {
  const conn = await connect();
  const query = await conn.collection('ingredients').findOne({ _id: ObjectId(id) });
  return query;
};

const updateIngredient = async (id, _id, bodyData, timeStamp) => {
  const { ingredientName, measureUnit, unitPrice } = bodyData;
  const conn = await connect();

  const { modifiedCount } = await conn.collection('ingredients')
    .updateOne(
      { _id: ObjectId(id) },
      {
        $set:
        {
          ingredientName, measureUnit, unitPrice, updatedBy: _id, updatedTime: timeStamp,
        },
      },
    );
  return modifiedCount;
};

module.exports = {
  createIngredient,
  getAllIngredients,
  getIngredientByName,
  getIngredientById,
  updateIngredient,
  // deleteIngredient,
};
