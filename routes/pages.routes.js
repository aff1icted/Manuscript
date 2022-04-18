const Router = require('express')
const router = new Router
const pagesConrroller = require('../controller/pages.controller')

router.put('/', pagesConrroller.update)
router.get('/elem/:item', pagesConrroller.getOne)
router.get('/footer', pagesConrroller.getfooter)
router.get('/', pagesConrroller.getAll)

module.exports = router