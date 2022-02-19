const express = require('./app');
require('dotenv').config();

const app = express();
const { PORT } = process.env;

// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
