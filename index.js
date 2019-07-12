require('dotenv').config();

const server = require('./src/server');

(async () => {
  server.start();
})();
