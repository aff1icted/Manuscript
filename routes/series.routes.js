const Router = require('express')
const router = new Router
const seriesConrroller = require('../controller/series.controller')

router.post('/',seriesConrroller.create)
router.get('/',seriesConrroller.getAll)

module.exports = router