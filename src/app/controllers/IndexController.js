class IndexController {
  index(req, res, next) {
    res.status(200).json('hi');
  }

  zueira(req, res) {
    console.log(req.params, req.query);
    res.status(200).json('zueira');
  }
}

module.exports = new IndexController();
