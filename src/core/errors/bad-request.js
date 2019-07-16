const HttpError = require('./http');

class BadRequestError extends HttpError {
  constructor(title) {
    super(title, 400);
  }
}

module.exports = BadRequestError;
