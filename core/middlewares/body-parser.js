class BodyParserMiddleware {
  _text = () => (req, res, next) => {
    let body = '';

    req.on('data', (data) => {
      body += data;
    });

    req.on('end', () => {
      req.body = body;
      next();
    });
  };

  json = () => (req, res, next) => {
    const contentType = req.headers['content-type'];

    if (!contentType || !contentType.includes('application/json')) {
      return next();
    }

    this._text(req, res, () => {
      try {
        req.body = JSON.parse(req.body);
      } catch (err) {
        req.body = null;
      }

      next();
    });
  };
}

module.exports = new BodyParserMiddleware();
