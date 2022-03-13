const {Covers} = require ('../models/models')
const ApiError = require('../error/ApiError')

class CoversController{
    async  create(req, res, next){
        const {cover} = req.body
        const candidate = await Covers.findOne({where: {cover}})
        if (candidate) {
            return next(ApiError.badRequest('Такой тип обложки уже существует'))
        }
        const covers = await Covers.create({cover})
        return res.json({covers})
    }

    async getAll(req, res){
        const covers = await Covers.findAll()
        return res.json(covers)
    }   
    
    async update(req, res) {
        
    }
    async delete(req, res) {
        const { cover } = req.params
        const covers = await Covers.destroy(
            {
                where: { cover }
            }
        )
        return res.json(covers)
    }
}

module.exports = new CoversController()