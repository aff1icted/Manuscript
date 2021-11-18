const Router = require('express')
const router = new Router
const coversConrroller = require('../controller/covers.controller')

router.post('/', coversConrroller.create)
router.get('/', coversConrroller.getAll)

module.exports = router