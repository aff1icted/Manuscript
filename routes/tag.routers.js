const Router = require('express')
const router = new Router
const TagConrroller = require('../controller/tag.controller')

router.post('/', TagConrroller.create)
router.get('/',TagConrroller.getAll)
router.delete('/:tagname', TagConrroller.delete)

module.exports = router