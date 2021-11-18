const { Type, Series } = require('../models/models')
const ApiError = require('../error/ApiError')
const path = require('path')
const uuid = require('uuid')

class SeriesController {
    async create(req, res) {
        try {
            const { seriesname, foundation } = req.body
            const { seriespic } = req.files
            let fileName = uuid.v4() + ".jpg"
            seriespic.mv(path.resolve(__dirname, '..', 'static', fileName))

            const series = await Series.create({ seriesname, foundation, seriespic: fileName })

            return res.json({series})
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }        
    }

    async getAll(req, res) {
        const series = await Series.findAll()
        return res.json(series)
    }

}

module.exports = new SeriesController()