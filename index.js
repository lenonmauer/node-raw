require('dotenv').config();

const server = require('./src/server');

(async () => {
  server.start(() => {
    console.log(`Listening at ${process.env.PORT} in ${process.env.NODE_ENV} mode`);
  });
})();
