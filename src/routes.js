const Router = require('./core/router');
const router = new Router();

const IndexController = require('./app/controllers/IndexController');

router.get('/', IndexController.index);

router.get('/zueira/:id', IndexController.zueira);

module.exports = router;
