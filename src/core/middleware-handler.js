class MiddlewareHandler {
  constructor() {
    this.middlewares = [];
    this.exceptionHandler = null;
  }

  use(fn) {
    this.middlewares.push(fn);
  }

  useExceptionHandler(fn) {
    this.exceptionHandler = fn;
  }

  run(...args) {
    const middlewares = [...this.middlewares, this.exceptionHandler];
    const middlewaresLength = middlewares.length;
    let iterator = 0;

    if (middlewaresLength === 0) {
      return;
    }

    const firstMiddleware = middlewares[0];

    const next = (error = null) => {
      iterator += 1;

      if (error) {
        return this.exceptionHandler(error, ...args);
      }

      if (iterator < middlewaresLength) {
        const nextMiddleware = middlewares[iterator];
        nextMiddleware(...args, next);
      }
    };

    firstMiddleware(...args, next);
  }
}

module.exports = MiddlewareHandler;
