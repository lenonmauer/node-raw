const url = require('url');
const MiddlewareHandler = require('../middleware-handler');

class RouterMiddleware {
  handle = (routes) => (req, res, next) => {
    let routeFound = false;

    routes.forEach((route) => {
      if (!this.#matchRoute(route, req)) {
        return;
      }

      routeFound = true;

      this.#runHandlers(req, res, next, route.handlers);
    });

    if (!routeFound) {
      res.status(404);
      next();
    }
  };

  #matchRoute = (route, req) => {
    const urlWithoutQuery = url.parse(req.url).pathname;
    const routeParts = route.url.split('/');
    const urlParts = urlWithoutQuery.split('/')
      .filter((part) => part.length > 0);

    if (urlParts.length !== routeParts.length || req.method !== route.method) {
      return false;
    }

    const result = routeParts.every((routePart, index) => {
      const isParam = routePart.match(/:[a-z]+/);
      return isParam || routePart === urlParts[index];
    });

    const reqParams = routeParts.reduce((res, part, index) => {
      if (part.match(/:[a-z]+/)) {
        res[part.substr(1)] = urlParts[index];
      }

      return res;
    }, {});

    req.params = reqParams;

    return result;
  }

  #runHandlers = (req, res, next, handlers) => {
    const middlewareHandler = new MiddlewareHandler();

    handlers.forEach((handler) => middlewareHandler.use(handler));

    middlewareHandler.run(req, res, next);
  }
}

module.exports = new RouterMiddleware();
