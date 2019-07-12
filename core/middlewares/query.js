class QueryMiddleware {
  get = () => (req, res, next) => {
    next();
  };
}

module.exports = new QueryMiddleware();
