const Router = require('express');
const router = new Router();
const userRouter = require('./userRouter');
const categoryRouter = require('./categoryRouter');
const brandRouter = require('./brandRouter');
const deviceRouter = require('./deviceRouter');

router.use('/user', userRouter);
router.use('/category', categoryRouter);
router.use('/brand', brandRouter);
router.use('/device', deviceRouter);

module.exports = router;