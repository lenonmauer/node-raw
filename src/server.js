const path = require('path');
const Application = require('./core/application');
const bodyParser = require('./core/middlewares/body-parser');
const logger = require('./core/middlewares/logger');
const staticFiles = require('./core/middlewares/static-files');
const notFound = require('./core/middlewares/not-found');

const app = new Application();
const router = require('./app/routes');

app
  .useMiddleware(logger())
  .useMiddleware(staticFiles.serve(path.resolve(__dirname, '..', 'public')))
  .useMiddleware(bodyParser.json())
  .useRouter(router)
  .useMiddleware(notFound());

module.exports = app;
