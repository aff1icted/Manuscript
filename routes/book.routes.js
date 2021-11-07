const Router = require('express')
const BookConrroller = require('../controller/Book.conrroller')
const router = new Router()
router.post('/books', BookConrroller.createBook)
router.get('/books', BookConrroller.getBooks)
router.get('/books/:isbn', BookConrroller.getOneBook)
router.put('/books', BookConrroller.updateBook)
router.delete('/books/:isbn', BookConrroller.deleteBook)

module.exports = router