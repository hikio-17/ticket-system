/* eslint-disable no-console */
require('dotenv').config();
const app = require('./src/app');

const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || 'localhost';

app.listen(PORT, () => {
  console.log(`Server running at http://${HOST}:${PORT}`);
});