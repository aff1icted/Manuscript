const Router = require('express')
const router = new Router
const pagesConrroller = require('../controller/pages.controller')

router.put('/', pagesConrroller.update)
router.get('/:item', pagesConrroller.getOne)
router.get('/', pagesConrroller.getAll)

module.exports = router