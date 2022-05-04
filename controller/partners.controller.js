const ApiError = require('../error/ApiError');
const uuid = require('uuid')
const path = require('path')
const { Partners } = require('../models/models');

class PartnersController {
    async create(req, res, next) {
        const { title, img } = req.body
        const candidate = await Partners.findOne({ where: { title } })
        if (candidate) {
            return next(ApiError.badRequest('Такой партнер уже существует'))
        }
        const tag = await Partners.create({ title })
        let fileName
        if (req.files != null) {
            const { img } = req.files
            fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static', fileName))
            await Partners.update({ img: fileName }, { where: { title } })
        }
        return res.json({ tag })
    }

    async getAll(req, res) {
        const tags = await Partners.findAll()
        return res.json(tags)
    }

    async getOne(req, res) {
        const { title } = req.params
        const tags = await Partners.findOne({ where: { title } })
        return res.json(tags)
    }

    async update(req, res) {
        const { title, oldtitle } = req.body
        const tags = await Partners.update({ title:title }, { where: { title: oldtitle } })
        let fileName
        if (req.files != null) {
            const { img } = req.files
            fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static', fileName))
            await Partners.update({ img: fileName }, { where: { title:title } })
        }
        return res.json({ tags })

    }

    async delete(req, res) {
        const { title } = req.params
        const tag = await Partners.destroy(
            {
                where: { title }
            }
        )
        return res.json(tag)
    }
}

module.exports = new PartnersController()