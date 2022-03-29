const Router = require('express')
const router = new Router
const formatConrroller = require('../controller/format.controller')

router.post('/', formatConrroller.create)
router.get('/', formatConrroller.getAll)
router.put('/', formatConrroller.update)
router.get('/:name', formatConrroller.getOne)
router.delete('/:name', formatConrroller.delete)

module.exports = router