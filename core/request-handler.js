const MiddlewareHandler = require('./middleware-handler');
const responseMiddleware = require('./middlewares/response');
const queryMiddleware = require('./middlewares/query');
const finalMiddleware = require('./middlewares/final');

class RequestHandler {
  handle(middlewares, req, res) {
    const handler = new MiddlewareHandler();

    handler.use(responseMiddleware.get());
    handler.use(queryMiddleware.get());
    middlewares.forEach((middleware) => handler.use(middleware));
    handler.run(req, res, finalMiddleware.get());
  }
}

module.exports = new RequestHandler();
