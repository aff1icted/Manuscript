const {Format} = require ('../models/models')
const ApiError = require('../error/ApiError')

class FormatController{
    async  create(req, res, next){
        const {name,transfercoeff} = req.body
        const candidate = await Format.findOne({where: {name}})
        if (candidate) {
            return next(ApiError.badRequest('Такой формат уже существует'))
        }
        const formats = await Format.create({name,transfercoeff})
        return res.json({formats})
    }

    async getAll(req, res){
        const formats = await Format.findAll()
        return res.json(formats)
    }

    async getOne(req, res) {
        const { name } = req.params
        const format = await Format.findOne(
            {
                where: { name }
            }
        )
        res.json(format)
    }

    async update(req, res) {
        const {name,transfercoeff} = req.body
        const formats = await Format.update({transfercoeff}, {where: { name } } )
        return res.json({formats})
    }
    async delete(req, res) {
        const { name } = req.params
        const formats = await Format.destroy(
            {
                where: { name }
            }
        )
        return res.json(formats)
    }
}

module.exports = new FormatController()