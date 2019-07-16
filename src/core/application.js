const http = require('http');
const requestHandler = require('./request-handler');

class Application {
  #server = null;

  #onRequest = (req, res) => {
    requestHandler.run(req, res);
  }

  start(port, callback) {
    this.#server = http.createServer();
    this.#server.on('request', this.#onRequest.bind(this));
    this.#server.listen(port, callback.bind(this));
  }

  useMiddleware(middleware) {
    requestHandler.use(middleware);
    return this;
  }

  useExceptionHandler(fn) {
    requestHandler.useExceptionHandler(fn);
    return this;
  }

  useRouter(router) {
    requestHandler.use(router.getMiddleware());
    return this;
  }
}

module.exports = Application;
