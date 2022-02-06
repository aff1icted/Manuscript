const {Type, Tags} = require ('../models/models')
const ApiError = require('../error/ApiError');

class TagController{
    async  create(req, res, next){
        const {tagname} = req.body
        const candidate = await Tags.findOne({where: {tagname}})
        if (candidate) {
            return next(ApiError.badRequest('Такой тег уже существует'))
        }
        const tag = await Tags.create({tagname})
        return res.json({tag})
    }

    async getAll(req, res){
        const tags = await Tags.findAll()
        return res.json(tags)
    }
}

module.exports = new TagController()