class FinalMiddleware {
  get = () => (req, res, next) => {
    if (res.statusCode < 400) {
      res.status(500);
    }

    switch (res.statusCode) {
      case 404:
        res.json({ error: '404 - Not Found' });
      case 500:
        res.json({ error: '500 - Internal Server Error' });
    }
  };
}

module.exports = new FinalMiddleware();
