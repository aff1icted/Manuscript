const { Type, Series } = require('../models/models')
const ApiError = require('../error/ApiError')
const path = require('path')
const uuid = require('uuid')

class SeriesController {
    async create(req, res, next) {
        try {
            const { seriesname, foundation } = req.body
            const candidate = await Series.findOne({ where: { seriesname } })
            if (candidate) {
                return next(ApiError.badRequest('Такая серия уже существует'))
            }
            const series = await Series.create({ seriesname, foundation})

            let fileName
            if (req.files != null) {
                const { seriespic } = req.files
                fileName = uuid.v4() + ".jpg"
                seriespic.mv(path.resolve(__dirname, '..', 'static', fileName))
                Series.update({ seriespic: fileName }, { where: { seriesname } })
            } 
            return res.json({ series })
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }



    async getAll(req, res) {
        const series = await Series.findAll()
        return res.json(series)
    }

    async getOne(req, res) {
        const { seriesname } = req.params
        const series = await Series.findOne(
            {
                where: { seriesname }
            }
        )
        return res.json(series)
    }

    async update(req, res) {
        const { oldseriesname, seriesname, foundation} = req.body
         
        let  series = await Series.update({ seriesname, foundation}, { where: { seriesname: oldseriesname } })
        if (req.files != null) {
            const { seriespic } = req.files
            let fileName = uuid.v4() + ".jpg"
            seriespic.mv(path.resolve(__dirname, '..', 'static', fileName))
            series = await Series.update({ seriespic: fileName }, { where: { seriesname} })
        }
        return res.json({ series })
    }

    async delete(req, res) {
        const { seriesname } = req.params
        const series = await Series.destroy(
            {
                where: { seriesname }
            }
        )
        return res.json(series)
    }

}

module.exports = new SeriesController()