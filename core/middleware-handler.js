class MiddlewareHandler {
  constructor() {
    if (!Array.prototype.last) {
      Array.prototype.last = function() {
        return this[this.length - 1];
      };
    }

    if (!Array.prototype.reduceOneRight) {
      Array.prototype.reduceOneRight = function() {
        return this.slice(0, -1);
      };
    }
  }

  use(fn) {
    this.run = ((stack) => (...args) =>
      stack(...args.reduceOneRight(), () => {
        let _next = args.last();
        fn.apply(this, [
          ...args.reduceOneRight(),
          _next.bind.apply(_next, [null, ...args.reduceOneRight()]),
        ]);
      }))(this.run);
  }

  run(...args) {
    const next = args.last();
    next.apply(this, args.reduceOneRight());
  }
}

module.exports = MiddlewareHandler;
