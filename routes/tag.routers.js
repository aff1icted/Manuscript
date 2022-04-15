const Router = require('express')
const router = new Router
const TagConrroller = require('../controller/tag.controller')

router.post('/', TagConrroller.create)
router.get('/',TagConrroller.getAll)
router.get('/:tagname',TagConrroller.getOne)
router.delete('/:tagname', TagConrroller.delete)
router.put('/', TagConrroller.update)

module.exports = router