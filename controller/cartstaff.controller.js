const ApiError = require("../error/ApiError")
const { CartStaff } = require("../models/models")


class CartStaffController {
    async create(req, res, next) {
        try {
            const { bookisbn, userUsername, amount } = req.body
            const staff = await CartStaff.create({ bookisbn, userUsername, amount })
            return res.json({ staff })
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res) {
        const staff = await CartStaff.findAll({ order: ['createdAt'] })
        return res.json(staff)
    }

    async getUserCart(req, res) {
        const { userUsername } = req.query
        const staff = await CartStaff.findAll({
            where: { userUsername, orderid: null },
            order: ['createdAt']
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