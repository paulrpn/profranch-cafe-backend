const { ObjectId } = require('mongodb');
const { ERROR_MSG_13 } = require('../utils/errorMessages');
const connect = require('./connectionDB');

const createIngredient = async (bodyData, _id, timeStamp) => {
  const conn = await connect();
  const {
    ingredientName, measureUnit, unitPrice, quantity,
  } = bodyData;

  const { insertedId } = await conn.collection('ingredients').insertOne(
    {
      ingredientName,
      measureUnit,
      unitPrice,
      quantity,
      createdBy: _id,
      createdTime: timeStamp,
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

const getIngredientByTag = async (tag) => {
  const conn = await connect();
  const query = await conn.collection('ingredients')
    .find({ ingredientName: { $regex: tag } })
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
  const conn = await connect();
  const {
    ingredientName, measureUnit, unitPrice, quantity,
  } = bodyData;

  const { modifiedCount } = await conn.collection('ingredients')
    .updateOne(
      { _id: ObjectId(id) },
      {
        $set:
        {
          ingredientName, measureUnit, unitPrice, quantity, updatedBy: _id, updatedTime: timeStamp,
        },
      },
    );
  return modifiedCount;
};

const deleteIngredient = async (id) => {
  const conn = await connect();

  const { deletedCount } = await conn.collection('ingredients')
    .deleteOne({ _id: ObjectId(id) });
  return deletedCount;
};

const consumeIngredients = async (productIngredients, productQuantity, _id, timeStamp) => {
  const conn = await connect();
  let sumPrices = 0;
  let decrementValue = 0;

  for (let index = 0; index < productIngredients.length; index += 1) {
    const { ingredientName, ingredientQuantity } = productIngredients[index];

    /* NOTA: Consulta o preço unitário de cada ingrediente e multiplica
    pela quantidade necessária para produção do produto */
    // eslint-disable-next-line no-await-in-loop
    const { unitPrice } = await conn.collection('ingredients').findOne({ ingredientName });
    sumPrices += (ingredientQuantity * unitPrice);
    decrementValue = parseFloat((ingredientQuantity * productQuantity).toFixed(2), 10);

    /* NOTA: Desconta a qtde de ingredientes necessários para fabricar
    a qtde de produtos informada */
    // eslint-disable-next-line no-await-in-loop
    await conn.collection('ingredients')
      .updateOne(
        { ingredientName },
        {
          $set: { updatedBy: _id, updatedTime: timeStamp },
          $inc: { quantity: -(decrementValue) },
        },
      );
  }

  const productCost = parseFloat(sumPrices.toFixed(2), 10);
  return productCost;
};

const checkIngredients = async (productIngredients, order) => {
  const conn = await connect();
  let decrementValue = 0;

  for (let index = 0; index < productIngredients.length; index += 1) {
    const { ingredientName, ingredientQuantity } = productIngredients[index];

    /* NOTA: Checa se é possível decrementar os ingredients necessários
    para atender o order sem zerar o estoque */
    // eslint-disable-next-line no-await-in-loop
    const { quantity } = await conn.collection('ingredients').findOne({ ingredientName });
    decrementValue = parseFloat((ingredientQuantity * order).toFixed(2), 10);

    if ((quantity - decrementValue) <= 0) throw ERROR_MSG_13;
  }

  return true;
};

module.exports = {
  createIngredient,
  getAllIngredients,
  getIngredientByTag,
  getIngredientById,
  updateIngredient,
  deleteIngredient,
  consumeIngredients,
  checkIngredients,
};
