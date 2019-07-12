const path = require('path');
const fs = require('fs');
const { promisify } = require('util');
const fileExistsAsync = promisify(fs.exists);

class StaticFilesMiddleware {
  serve = (dir) => async (req, res, next) => {
    const url = req.url;
    const file = path.join(dir, url);

    fs.stat(file, (err, stats) => {
      if (err || !stats.isFile()) {
        return next();
      }

      fs.createReadStream(file).pipe(res);
    });
  };
}

module.exports = new StaticFilesMiddleware();
