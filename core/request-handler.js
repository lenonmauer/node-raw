class RequestHandler {
  constructor(router) {
    this.router = router;
  }

  handle(req, res) {
    res.end('ok');
  }

  parseQueryString() {}
}

module.exports = (router) => new RequestHandler(router);
