const Router = require ('express')
const router = new Router()
const tagRouter = require('./tag.routers')
const bookRouter = require('./book.routes')
const authorRouter = require('./author.routes')
const seriesRouter = require('./series.routes')
const formatRouter = require('./format.routes')
const coversRouter = require('./covers.routes')
const userRouter = require('./user.routers')

router.use('/tag', tagRouter)
router.use('/author', authorRouter)
router.use('/series', seriesRouter)
router.use('/book', bookRouter)
router.use('/format', formatRouter)
router.use('/cover', coversRouter)
router.use('/user', userRouter)

module.exports = router