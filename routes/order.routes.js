const Router = require('express')
const orderConrroller = require('../controller/order.controller')
const router = new Router()
router.post('/', orderConrroller.create)
router.get('/', orderConrroller.getAll)
router.get('/:id', orderConrroller.getOne)
router.put('/', orderConrroller.update)
module.exports = router