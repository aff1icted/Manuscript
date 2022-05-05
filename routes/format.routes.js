const Router = require('express')
const router = new Router
const formatConrroller = require('../controller/format.controller')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/',checkRole('ADMIN'), formatConrroller.create)
router.get('/', formatConrroller.getAll)
router.put('/',checkRole('ADMIN'), formatConrroller.update)
router.get('/:name', formatConrroller.getOne)
router.delete('/:name',checkRole('ADMIN'), formatConrroller.delete)

module.exports = router