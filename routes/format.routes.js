const Router = require('express')
const router = new Router
const formatConrroller = require('../controller/format.controller')

router.post('/', formatConrroller.create)
router.get('/', formatConrroller.getAll)

module.exports = router