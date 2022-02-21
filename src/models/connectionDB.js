const { MongoClient } = require('mongodb');
require('dotenv').config();

const DB_URL = `mongodb://${process.env.HOST}:27017/ProFranchCafe`;
const DB_NAME = 'ProFranchCafe';

module.exports = () => MongoClient.connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then((connection) => connection.db(DB_NAME))
  .catch((err) => {
    // eslint-disable-next-line no-console
    console.error(err);
    process.exit(1);
  });
