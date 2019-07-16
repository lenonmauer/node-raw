class IndexController {
  index(req, res, next) {
    res.status(200).json('hi');
  }

  zueira(req, res) {
    res.status(200).json('zueira');
  }

  post(req, res) {
    res.json(req.body);
  }
}

module.exports = new IndexController();
