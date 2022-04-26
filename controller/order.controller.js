const ApiError = require("../error/ApiError")
const { Orders, CartStaff } = require("../models/models")

class OrderController {
    async create(req, res, next) {
        try {
            const { fullname, phonenumber, status, userUsername } = req.body
            const order = await Orders.create({ fullname, phonenumber, status, userUsername }).then(
                data => {
                    await CartStaff.update({ orderid: data.id }, { where: { userUsername, orderid: null } })
                })
            return res.json({ order })
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res) {
        const orders = await Orders.findAll({ order: ['createdAt'] })
        return res.json(orders)
    }
    async getOne(req, res) {
        const { id } = req.params
        const order = await Orders.findOne({ where: { id } })
        return res.json(order)
    }

    async update(req, res) {
        const {id , status} = req.body
        const order = await Orders.update({ status }, { where: { id } })
        return res.json(order)
    }

}

module.exports = new OrderController()