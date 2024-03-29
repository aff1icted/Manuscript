const Router = require('express')
const orderConrroller = require('../controller/order.controller')
const authMiddleware = require('../middleware/authMiddleware')
const checkRole = require('../middleware/checkRoleMiddleware')
const router = new Router()
router.post('/',authMiddleware, orderConrroller.create)
router.get('/', orderConrroller.getAll)
router.get('/:id', orderConrroller.getOne)
router.put('/',checkRole('ADMIN'), orderConrroller.update)
module.exports = router