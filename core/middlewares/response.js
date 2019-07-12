class ResponseMiddleware {
  get = () => (req, res, next) => {
    res.status = function(status) {
      res.statusCode = status;
      return this;
    };

    res.json = function(data) {
      res.end(JSON.stringify(data));
    };

    next();
  };
}

module.exports = new ResponseMiddleware();
