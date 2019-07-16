class HttpError extends Error {
  constructor(title, status) {
    super(title);
    this.status = status;
  }
}

module.exports = HttpError;
