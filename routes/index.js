const Router = require ('express')
const router = new Router()
const tagRouter = require('./tag.routers')
const bookRouter = require('./book.routes')
const authorRouter = require('./author.routes')
const seriesRouter = require('./series.routes')

router.use('/tag', tagRouter)
router.use('/author', authorRouter)
router.use('/series', seriesRouter)
router.use('/book', bookRouter)

module.exports = router