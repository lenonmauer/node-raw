const MiddlewareHandler = require('../middleware-handler');
const url = require('url');

class RouterMiddleware {
  handle = (routes) => (req, res, next) => {
    const { url, method } = req;
    let routeFound = false;

    for (let route of routes) {
      if (!this._matchRoute(route, req)) {
        continue;
      }

      routeFound = true;

      this._runHandlers(req, res, next, route.handlers);
    }

    if (!routeFound) {
      res.status(404);
      next();
    }
  };

  _matchRoute(route, req) {
    const urlWithoutQuery = url.parse(req.url).pathname;
    const urlParts = urlWithoutQuery.split('/');
    const routeParts = route.url.split('/');

    if (urlParts.length !== routeParts.length || req.method !== route.method) {
      return false;
    }

    const result = routeParts.every((routePart, index) => {
      const isParam = routePart.match(/:[a-z]+/);
      return isParam || routePart === urlParts[index];
    });

    const reqParams = routeParts.reduce((result, part, index) => {
      if (part.match(/:[a-z]+/)) {
        result[part.substr(1)] = urlParts[index];
      }

      return result;
    }, {});

    req.params = reqParams;

    return result;
  }

  _runHandlers(req, res, next, handlers) {
    const middlewareHandler = new MiddlewareHandler();

    for (let handler of handlers) {
      middlewareHandler.use(handler);
    }

    middlewareHandler.run(req, res, next);
  }
}

module.exports = new RouterMiddleware();
