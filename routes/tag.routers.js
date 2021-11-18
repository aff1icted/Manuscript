const Router = require('express')
const router = new Router
const TagConrroller = require('../controller/Tag.controller')

router.post('/', TagConrroller.create)
router.get('/',TagConrroller.getAll)

module.exports = router