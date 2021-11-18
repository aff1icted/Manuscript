const {Type, Tags} = require ('../models/models')

class TagController{
    async  create(req, res){
        const {tagname} = req.body
        const tag = await Tags.create({tagname})
        return res.json({tag})
    }

    async getAll(req, res){
        const tags = await Tags.findAll()
        return res.json(tags)
    }
}

module.exports = new TagController()