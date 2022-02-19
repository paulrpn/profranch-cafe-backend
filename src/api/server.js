const app = require('./app');
require('dotenv').config();

const { PORT } = process.env;

// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
