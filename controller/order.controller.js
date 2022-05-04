const ApiError = require("../error/ApiError")
const { Orders, CartStaff, User } = require("../models/models")

class OrderController {
    async create(req, res, next) {
        try {
            const { fullname, phonenumber,  userUsername } = req.body
            const order = await Orders.create({ fullname, phonenumber, status:'Оформлен', userUsername }).then(
                function ( data ) {
                    CartStaff.update({ orderId: data.id }, { where: { userUsername, orderId: null } })
                })
            return res.json({ order })
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res) {
        const { user } = req.query
        if (user !=null) {
            const orders = await Orders.findAll({ 
                where: [{userUsername:user}],
                order: [['createdAt', 'DESC']] })
            return res.json(orders)
        }
        const orders = await Orders.findAll({ 
            include: [{model: User}],
            order: [['createdAt', 'DESC']] })
        return res.json(orders)
    }
    async getOne(req, res) {
        const { id } = req.params
        const order = await Orders.findOne({ include: [{model: User}],
            where: { id } })
        return res.json(order)
    }

    async update(req, res) {
        const {id , status} = req.body
        const order = await Orders.update({ status }, { where: { id } })
        return res.json(order)
    }

}

module.exports = new OrderController()