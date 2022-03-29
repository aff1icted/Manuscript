const Router = require('express')
const router = new Router
const authorConrroller = require('../controller/author.controller')

router.post('/', authorConrroller.create)
router.get('/', authorConrroller.getAll)
router.get('/:fullname', authorConrroller.getOne) 
router.put('/', authorConrroller.update)
router.delete('/:fullname', authorConrroller.delete)


module.exports = router