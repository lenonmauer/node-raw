const path = require('path');
const fs = require('fs');
const mime = require('mime-types');

class StaticFilesMiddleware {
  serve = (dir) => (req, res, next) => {
    if (req.method !== 'GET' && req.method !== 'HEAD') {
      return next();
    }

    const { url } = req;
    const filepath = path.join(dir, url);
    const filename = path.basename(filepath);

    fs.stat(filepath, (err, stats) => {
      if (err || stats.isDirectory()) {
        return next();
      }

      res.setHeader('Content-type', mime.contentType(filename));
      res.setHeader('Content-length', stats.size);
      fs.createReadStream(filepath).pipe(res);
    });
  };
}

module.exports = new StaticFilesMiddleware();
