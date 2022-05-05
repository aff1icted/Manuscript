const Router = require('express')
const router = new Router
const partnersConrroller = require('../controller/partners.controller')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/',checkRole('ADMIN'), partnersConrroller.create)
router.get('/', partnersConrroller.getAll)
router.get('/:title', partnersConrroller.getOne) 
router.put('/',checkRole('ADMIN'), partnersConrroller.update)
router.delete('/:title',checkRole('ADMIN'), partnersConrroller.delete)


module.exports = router