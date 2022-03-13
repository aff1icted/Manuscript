const Router = require('express')
const router = new Router
const seriesConrroller = require('../controller/series.controller')

router.post('/',seriesConrroller.create)
router.get('/',seriesConrroller.getAll)
router.get('/:seriesname', seriesConrroller.getOne)
router.put('/', seriesConrroller.update)
router.delete('/:seriesname', seriesConrroller.delete)


module.exports = router