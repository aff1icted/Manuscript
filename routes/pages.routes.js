const Router = require('express')
const router = new Router
const pagesConrroller = require('../controller/pages.controller')
const checkRole = require('../middleware/checkRoleMiddleware')

router.put('/',checkRole('ADMIN'), pagesConrroller.update)
router.get('/elem/:item', pagesConrroller.getOne)
router.get('/footer', pagesConrroller.getfooter)
router.get('/banner', pagesConrroller.getbanner)
router.get('/', pagesConrroller.getAll)

module.exports = router