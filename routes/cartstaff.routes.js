const Router = require('express')
const cartstaffConrroller = require('../controller/cartstaff.controller')
const router = new Router()
router.post('/', cartstaffConrroller.create)
router.get('/', cartstaffConrroller.getAll)
router.get('/:user', cartstaffConrroller.getUserCart)
router.put('/', cartstaffConrroller.update)
router.delete('/:id', cartstaffConrroller.delete)
module.exports = router