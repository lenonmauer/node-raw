const BadRequestError = require('../errors/bad-request');

class BodyParserMiddleware {
  text = () => (req, res, next) => {
    let body = '';
    const { method } = req;

    if (method === 'GET') {
      return next();
    }

    req.on('data', (data) => {
      body += data;
    });

    req.on('end', () => {
      req.body = body;
      next();
    });
  };

  json = () => (req, res, next) => {
    const contentType = req.headers['content-type'] || '';
    const { method } = req;

    if (!contentType.includes('application/json') || method === 'GET') {
      return next();
    }

    try {
      req.body = JSON.parse(req.body);
    } catch (err) {
      return next(new BadRequestError('Invalid JSON body'));
    }

    next();
  };
}

module.exports = new BodyParserMiddleware();
