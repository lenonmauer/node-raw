const http = require('http');
const requestHandler = require('./request-handler');
const Router = new require('./router');

class HttpServer {
  constructor(config) {
    this._config = config;
    this._server = null;
    this._middlewares = [];
  }

  start() {
    this._server = http.createServer();
    this._bindEvents();
    console.log('start');
  }

  _bindEvents() {
    this._server.on('request', this._onRequest.bind(this));
    this._server.listen(this._config.PORT, this._onListening.bind(this));
  }

  _onRequest(req, res) {
    console.log(req.method + ' - ' + req.url);
    requestHandler.handle(this._middlewares, req, res);
  }

  _onListening() {
    console.log(`Listening at ${this._config.PORT}`);
  }

  useMiddleware(middleware) {
    this._middlewares.push(middleware);
    return this;
  }

  useRouter(router) {
    if (router instanceof Router === false) {
      throw new Error('router must be instance of core/router');
    }

    this.useMiddleware(router.getMiddleware());
    return this;
  }
}

module.exports = (config) => {
  return new HttpServer(config);
};
