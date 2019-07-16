module.exports = () => (req, res, next) => {
  res.status = function (status) {
    res.statusCode = status;
    return this;
  };

  res.json = function (data) {
    res.end(JSON.stringify(data));
  };

  next();
};
