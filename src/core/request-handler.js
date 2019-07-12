const MiddlewareHandler = require('./middleware-handler');
const responseMiddleware = require('./middlewares/response');
const queryMiddleware = require('./middlewares/query');
const exceptionHandlerMiddleware = require('./middlewares/exception-handler');

class RequestHandler {
  handle(middlewares, req, res) {
    const middlewareHandler = new MiddlewareHandler();

    middlewareHandler.use(responseMiddleware.get());
    middlewareHandler.use(queryMiddleware.get());
    middlewares.forEach((middleware) => middlewareHandler.use(middleware));

    middlewareHandler.run(req, res, exceptionHandlerMiddleware.handle());
  }
}

module.exports = new RequestHandler();
