const routerMiddleware = require('./middlewares/router');

class Router {
  constructor() {
    this._routes = [];
  }

  get(url, ...handlers) {
    this._pushRoute('GET', url, handlers);
  }

  post(url, ...handlers) {
    this._pushRoute('POST', url, handlers);
  }

  put(url, ...handlers) {
    this._pushRoute('PUT', url, handlers);
  }

  delete(url, ...handlers) {
    this._pushRoute('DELETE', url, handlers);
  }

  _pushRoute(method, url, handlers) {
    this._routes.push({
      method,
      url,
      handlers,
    });
  }

  getMiddleware() {
    return routerMiddleware.get(this._routes);
  }
}

module.exports = Router;
