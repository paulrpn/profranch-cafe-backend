const express = require('express');
require('dotenv').config();

const app = express();

const { PORT } = process.env;

app.get('/', (req, res) => res.send('Hello World!'));
// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
