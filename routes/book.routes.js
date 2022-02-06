const Router = require('express')
const BookConrroller = require('../controller/book.conrroller')
const router = new Router()
router.post('/', BookConrroller.create)
router.get('/', BookConrroller.getAll)
router.get('/:isbn', BookConrroller.getOneBook)
router.put('/', BookConrroller.updateBook)
router.delete('/:isbn', BookConrroller.deleteBook)

module.exports = router