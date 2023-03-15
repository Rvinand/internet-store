const Router = require('express');
const router = new Router();
const brandController = require('../controllers/brandController');
const checkRole = require('../../server/middleware/checkRoleMiddleware');

router.post('/', checkRole('ADMIN'), brandController.create);
router.get('/', brandController.getAll);

module.exports = router;