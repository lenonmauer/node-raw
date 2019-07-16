const Router = require('../core/router');

const router = new Router();

const IndexController = require('./controllers/IndexController');

router.get('/', IndexController.index);

router.get('/zueira/:id', IndexController.zueira);
router.post('/zueira/:id', IndexController.post);

module.exports = router;
