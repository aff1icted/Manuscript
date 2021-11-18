const {Covers} = require ('../models/models')

class CoversController{
    async  create(req, res){
        const {cover} = req.body
        const covers = await Covers.create({cover})
        return res.json({covers})
    }

    async getAll(req, res){
        const covers = await Covers.findAll()
        return res.json(covers)
    }
}

module.exports = new CoversController()