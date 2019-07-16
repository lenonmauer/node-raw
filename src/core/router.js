const routerMiddleware = require('./middlewares/router');

class Router {
  #routes = [];

  get(url, ...handlers) {
    this.#pushRoute('GET', url, handlers);
  }

  post(url, ...handlers) {
    this.#pushRoute('POST', url, handlers);
  }

  put(url, ...handlers) {
    this.#pushRoute('PUT', url, handlers);
  }

  delete(url, ...handlers) {
    this.#pushRoute('DELETE', url, handlers);
  }

  #pushRoute = (method, url, handlers) => {
    this.#routes.push({
      method,
      url,
      handlers,
    });
  }

  getMiddleware() {
    return routerMiddleware.handle(this.#routes);
  }
}

module.exports = Router;
