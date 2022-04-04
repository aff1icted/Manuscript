const ApiError = require('../error/ApiError')
const { Pages } = require('../models/models');

class pagesController {

    async getAll(req, res) {
        const pages = await Pages.findAll()
        return res.json(pages)
    }

    async getOne(req, res) {
        const { item } = req.params
        const page = await Pages.findOne(
            {
                where: { item }
            }
        )
        res.json(page)
    }

    async update(req, res, next) {
        try {
            const { mainText, book, author, about, footer, first, second, third, fourth, fifth } = req.body
            let page
            if ((await Pages.findAll()).length == 0) {
                page = await Pages.create({ item: 'mainText', text: mainText })
                await Pages.create({ item: 'book', text: book })
                await Pages.create({ item: 'author', text: author })
                await Pages.create({ item: 'about', text: about })
                await Pages.create({ item: 'footer', text: footer })
                await Pages.create({ item: 'first', text: first })
                await Pages.create({ item: 'second', text: second })
                await Pages.create({ item: 'third', text: third })
                await Pages.create({ item: 'fourth', text: fourth })
                await Pages.create({ item: 'fifth', text: fifth })
            } else {
                page = await Pages.update({ text: mainText }, { where: { item: 'mainText' } })
                await Pages.update({ text: book }, { where: { item: 'book' } })
                await Pages.update({ text: author }, { where: { item: 'author' } })
                await Pages.update({ text: about }, { where: { item: 'about' } })
                await Pages.update({ text: footer }, { where: { item: 'footer' } })
                await Pages.update({ text: first }, { where: { item: 'first' } })
                await Pages.update({ text: second }, { where: { item: 'second' } })
                await Pages.update({ text: third }, { where: { item: 'third' } })
                await Pages.update({ text: fourth }, { where: { item: 'fourth' } })
                await Pages.update({ text: fifth }, { where: { item: 'fifth' } })
            }
            return res.json(page)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }


    }
}

module.exports = new pagesController()