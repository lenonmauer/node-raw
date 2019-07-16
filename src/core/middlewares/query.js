const url = require('url');

module.exports = () => (req, res, next) => {
  req.query = Object.assign({}, url.parse(req.url, true).query);
  next();
};
