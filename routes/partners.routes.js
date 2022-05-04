const Router = require('express')
const router = new Router
const partnersConrroller = require('../controller/partners.controller')

router.post('/', partnersConrroller.create)
router.get('/', partnersConrroller.getAll)
router.get('/:title', partnersConrroller.getOne) 
router.put('/', partnersConrroller.update)
router.delete('/:title', partnersConrroller.delete)


module.exports = router