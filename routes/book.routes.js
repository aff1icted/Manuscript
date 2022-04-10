const Router = require('express')
const BookConrroller = require('../controller/book.conrroller')
const router = new Router()
router.post('/', BookConrroller.create)
router.get('/', BookConrroller.getAll)
router.get('/:isbn', BookConrroller.getOne)
router.put('/', BookConrroller.update)
router.delete('/:title', BookConrroller.delete)


module.exports = router