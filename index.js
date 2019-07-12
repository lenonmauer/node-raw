require('dotenv').config();

const path = require('path');
const app = require('./core/http-server')(process.env);
const bodyParser = require('./core/middlewares/body-parser');
const staticFiles = require('./core/middlewares/static-files');
const notFoundMiddleware = require('./core/middlewares/not-found');
const Router = require('./core/router');
const router = new Router();

router.get('/', (req, res) => {
  res.status(200).json('hi');
});

app
  .useMiddleware(staticFiles.serve(path.join(__dirname, 'public')))
  .useMiddleware(bodyParser.json())
  .useRouter(router)
  .useMiddleware(notFoundMiddleware.get())
  .start();
