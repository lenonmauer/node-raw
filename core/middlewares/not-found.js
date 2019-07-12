class NotFoundMiddleware {
  get = () => (req, res, next) => {
    res.status(404);
    next();
  };
}

module.exports = new NotFoundMiddleware();
