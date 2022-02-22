const { ObjectId } = require('mongodb');
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
    const { ingredientName, quantity } = productIngredients[index];

    /* NOTA: Consulta o preço unitário de cada ingrediente e multiplica pela quantidade
    necessária para produção do produto */
    // eslint-disable-next-line no-await-in-loop
    const { unitPrice } = await conn.collection('ingredients').findOne({ ingredientName });
    sumPrices += (quantity * unitPrice);
    decrementValue = parseFloat((quantity * productQuantity).toFixed(2), 10);

    /* NOTA: Desconta a qtde de ingredientes necessários para fabricar a qtde de produtos
    informada */
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

module.exports = {
  createIngredient,
  getAllIngredients,
  getIngredientByName,
  getIngredientById,
  updateIngredient,
  deleteIngredient,
  consumeIngredients,
};
