const MiddlewareHandler = require('../middleware-handler');
const notFoundMiddleware = require('./not-found');

class RouterMiddleware {
  get = (routes) => (req, res, next) => {
    const { url, method } = req;

    for (let route of routes) {
      if (!this._routeMatches(route, req)) {
        continue;
      }

      this._runHandlers(req, res, route.handlers);
    }

    next();
  };

  _routeMatches(route, req) {
    const { url, method } = req;

    console.log(url, method);

    if (url === route.url && method === route.method) {
      return true;
    }

    return false;
  }

  _runHandlers(req, res, handlers) {
    const middlewareHandler = new MiddlewareHandler();

    for (let handler of handlers) {
      middlewareHandler.use(handler);
    }

    middlewareHandler.run(req, res, () => {});
  }
}

module.exports = new RouterMiddleware();
