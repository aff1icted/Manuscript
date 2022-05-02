const ApiError = require("../error/ApiError")
const { CartStaff, Book } = require("../models/models")


class CartStaffController {
    async create(req, res, next) {
        try {
            const { bookIsbn, userUsername, amount } = req.body
            const staff = await CartStaff.create({ bookIsbn, userUsername, amount })
            return res.json({ staff })
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res) {
        const { orderid } = req.query
        if (orderid != null) {
            const staff = await CartStaff.findAll({ 
                include: [{ model: Book }],
                where: {orderId:orderid},
                order: [['createdAt', 'DESC']]})
            return res.json(staff)
        }
        const staff = await CartStaff.findAll({ order: [['createdAt', 'DESC']] })
        return res.json(staff)
    }

    async getUserCart(req, res) {
        const { user } = req.params
        const staff = await CartStaff.findAll({
            include: [{ model: Book }],
            where: { userUsername: user, orderId: null },
            order: [['createdAt', 'DESC']]
        })
        return res.json(staff)
    }

    async update(req, res) {
        const { id, amount } = req.body
        const staff = await Authors.update({ amount }, { where: { id } })
        return res.json({ author })
    }

    async delete(req, res) {
        const { id } = req.params
        const staff = await CartStaff.destroy(
            {
                where: { id }
            }
        )
        return res.json(staff)
    }

}
module.exports = new CartStaffController()