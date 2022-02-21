const connect = require('./connectionDB');

const getUserByEmail = async (userEmail) => {
  const conn = await connect();
  const query = await conn.collection('users').findOne({ userEmail });
  return query;
};

const createUser = async (userName, userEmail, userPassword) => {
  const conn = await connect();

  const { insertedId } = await conn.collection('users').insertOne(
    {
      userName,
      userEmail,
      userPassword,
      userRole: 'user',
    },
  );

  return insertedId;
};

module.exports = {
  getUserByEmail,
  createUser,
};
