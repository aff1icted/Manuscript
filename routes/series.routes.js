const Router = require('express')
const router = new Router
const seriesConrroller = require('../controller/series.controller')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/',checkRole('ADMIN'),seriesConrroller.create)
router.get('/',seriesConrroller.getAll)
router.get('/:seriesname', seriesConrroller.getOne)
router.put('/',checkRole('ADMIN'), seriesConrroller.update)
router.delete('/:seriesname',checkRole('ADMIN'), seriesConrroller.delete)


module.exports = router