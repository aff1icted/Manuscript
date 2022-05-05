const Router = require('express')
const router = new Router
const coversConrroller = require('../controller/covers.controller')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/',checkRole('ADMIN'), coversConrroller.create)
router.get('/', coversConrroller.getAll)
router.delete('/:cover',checkRole('ADMIN'), coversConrroller.delete)
router.put('/',checkRole('ADMIN'), coversConrroller.update)

module.exports = router