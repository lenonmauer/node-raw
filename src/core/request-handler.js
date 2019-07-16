const MiddlewareHandler = require('./middleware-handler');
const exceptionHandlerMiddleware = require('./middlewares/exception-handler');
const responseMiddleware = require('./middlewares/response');
const queryMiddleware = require('./middlewares/query');
const bodyParser = require('./middlewares/body-parser');

class RequestHandler {
  middlewareHandler = new MiddlewareHandler();

  constructor() {
    this.#addDefaultMiddlewares();
  }

  #addDefaultMiddlewares = () => {
    this.middlewareHandler.use(responseMiddleware());
    this.middlewareHandler.use(queryMiddleware());
    this.middlewareHandler.use(bodyParser.text());
    this.middlewareHandler.useExceptionHandler(exceptionHandlerMiddleware());
  }
}

const requestHandler = new Proxy(new RequestHandler(), {
  get: (obj, prop) => (prop in obj ? obj[prop] : obj.middlewareHandler[prop]),
});

module.exports = requestHandler;
