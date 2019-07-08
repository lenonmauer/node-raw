const http = require('http');
const requestHandler = require('./request-handler');

class HttpServer {
  constructor(config) {
    this.config = config;
  }

  start() {
    this.server = http.createServer();
    this.bindEvents();
  }

  bindEvents() {
    this.server.on('request', this.onRequest.bind(this));
    this.server.listen(this.config.PORT, this.onListening.bind(this));
  }

  onRequest(req, res) {
    requestHandler(this.router).handle(req, res);
  }

  onListening() {
    console.log(`Listening at ${this.config.PORT}`);
  }

  setRouter(router) {
    this.router = router;

    return this;
  }
}

module.exports = (config) => {
  return new HttpServer(config);
};
