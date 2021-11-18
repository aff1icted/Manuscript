const Router = require('express')
const router = new Router
const authorConrroller = require('../controller/author.controller')

router.post('/', authorConrroller.create)
router.get('/', authorConrroller.getAll)

module.exports = router