require('dotenv').config();

const server = require('./src/server');

const { PORT, NODE_ENV } = process.env;

(async () => {
  server.start(PORT, () => {
    console.log(`Listening at ${PORT} in ${NODE_ENV} mode`);
  });
})();
