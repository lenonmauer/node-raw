const path = require('path');
const app = require('./core/http-server')(process.env);
const bodyParser = require('./core/middlewares/body-parser');
const staticFiles = require('./core/middlewares/static-files');
const router = require('./routes');

app
  .useMiddleware(staticFiles.serve(path.resolve(__dirname, '..', 'public')))
  .useMiddleware(bodyParser.json())
  .useRouter(router);

module.exports = app;
