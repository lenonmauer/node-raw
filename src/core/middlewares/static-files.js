const path = require('path');
const fs = require('fs');
const mime = require('mime-types');
const recursive = require('recursive-readdir');

class StaticFilesMiddleware {
  serve = (dir) => {
    const filesCached = [];

    recursive(dir, function(err, files) {
      files.forEach((file) => {
        const filename = path.basename(file);

        fs.stat(file, (err, stats) => {
          if (err) return;

          filesCached.push({
            size: stats.size,
            name: filename,
            path: file,
            type: mime.lookup(filename),
          });
        });
      });
    });

    return (req, res, next) => {
      if (req.method !== 'GET' && req.method !== 'HEAD') {
        return next();
      }

      const url = req.url;
      const filepath = path.join(dir, url);
      const fileMatched = filesCached.find((fileCached) => fileCached.path === filepath);

      if (!fileMatched) {
        return next();
      }

      res.setHeader('Content-type', mime.contentType(fileMatched.type));
      res.setHeader('Content-length', fileMatched.size);

      fs.createReadStream(filepath).pipe(res);
    };
  };
}

module.exports = new StaticFilesMiddleware();
