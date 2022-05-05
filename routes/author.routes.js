const Router = require('express')
const router = new Router
const checkRole = require('../middleware/checkRoleMiddleware')
const authorConrroller = require('../controller/author.controller')

router.post('/',checkRole('ADMIN'), authorConrroller.create)
router.get('/', authorConrroller.getAll)
router.get('/:fullname', authorConrroller.getOne) 
router.put('/',checkRole('ADMIN'), authorConrroller.update)
router.delete('/:fullname',checkRole('ADMIN'), authorConrroller.delete)


module.exports = router