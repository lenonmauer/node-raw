const http = require('http');
const requestHandler = require('./request-handler');
const Router = new require('./router');

class HttpServer {
  constructor(config) {
    this._config = config;
    this._server = null;
    this._middlewares = [];
  }

  start(callback) {
    this._server = http.createServer();
    this._server.on('request', this._onRequest.bind(this));
    this._server.listen(this._config.PORT, callback.bind(this));
  }

  _onRequest(req, res) {
    console.log(req.method + ' - ' + req.url);
    requestHandler.handle(this._middlewares, req, res);
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
