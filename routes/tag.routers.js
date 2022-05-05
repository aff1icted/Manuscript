const Router = require('express')
const router = new Router
const TagConrroller = require('../controller/tag.controller')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', checkRole('ADMIN'), TagConrroller.create)
router.get('/', TagConrroller.getAll)
router.get('/:tagname', TagConrroller.getOne)
router.delete('/:tagname', checkRole('ADMIN'), TagConrroller.delete)
router.put('/', checkRole('ADMIN'), TagConrroller.update)

module.exports = router