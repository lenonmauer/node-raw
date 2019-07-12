var url = require('url');

class QueryMiddleware {
  get = () => (req, res, next) => {
    req.query = Object.assign({}, url.parse(req.url, true).query);
    next();
  };
}

module.exports = new QueryMiddleware();
