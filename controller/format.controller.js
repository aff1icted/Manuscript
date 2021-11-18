const {Format} = require ('../models/models')

class FormatController{
    async  create(req, res){
        const {name,transfercoeff} = req.body
        const formats = await Format.create({name,transfercoeff})
        return res.json({formats})
    }

    async getAll(req, res){
        const formats = await Format.findAll()
        return res.json(formats)
    }
}

module.exports = new FormatController()