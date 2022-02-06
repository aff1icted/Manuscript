const uuid = require('uuid')
const { Type, Authors } = require('../models/models')
const path = require('path')
const ApiError = require('../error/ApiError')

class AuthorsController {
    async create(req, res, next) {
        try {
            const { fullname, about } = req.body
            let fileName
            if (req.files != null) {
                const { img } = req.files
                fileName = uuid.v4() + ".jpg"
                img.mv(path.resolve(__dirname, '..', 'static', fileName))
            } else {
                fileName = 'noimg'
            }


            const candidate = await Authors.findOne({ where: { fullname } })
            if (candidate) {
                return next(ApiError.badRequest('Такой автор уже существует'))
            }



            const author = await Authors.create({ fullname, about, photo: fileName })

            return res.json({ author })
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res) {
        const authors = await Authors.findAll()
        return res.json(authors)
    }


}

module.exports = new AuthorsController()