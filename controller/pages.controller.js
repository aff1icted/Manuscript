const ApiError = require('../error/ApiError')
const { Pages } = require('../models/models');
const path = require('path');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

class pagesController {

    async getAll(req, res) {

        if ((await Pages.findAll()).length == 0) {
            await Pages.create({ item: 'mainText', text: mainText })
            await Pages.create({ item: 'book' })
            await Pages.create({ item: 'author' })
            await Pages.create({ item: 'about' })
            await Pages.create({ item: 'footer1' })
            await Pages.create({ item: 'footer2' })
            await Pages.create({ item: 'footer3' })
            await Pages.create({ item: 'footer4' })
            await Pages.create({ item: 'footer5' })
            await Pages.create({ item: 'footer6' })
            await Pages.create({ item: 'first', img: 'slider1.jpg' })
            await Pages.create({ item: 'second', img: 'slider2.jpg' })
            await Pages.create({ item: 'third', img: 'slider3.jpg' })
            await Pages.create({ item: 'fourth', img: 'slider4.jpg' })
            await Pages.create({ item: 'fifth', img: 'slider5.jpg' })
        }

        const pages = await Pages.findAll()
        return res.json(pages)
    }

    async getfooter(req, res) {

        if ((await Pages.findAll()).length == 0) {
            await Pages.create({ item: 'mainText', text: mainText })
            await Pages.create({ item: 'book' })
            await Pages.create({ item: 'author' })
            await Pages.create({ item: 'about' })
            await Pages.create({ item: 'footer1' })
            await Pages.create({ item: 'footer2' })
            await Pages.create({ item: 'footer3' })
            await Pages.create({ item: 'footer4' })
            await Pages.create({ item: 'footer5' })
            await Pages.create({ item: 'footer6' })
            await Pages.create({ item: 'first', img: 'slider1.jpg' })
            await Pages.create({ item: 'second', img: 'slider2.jpg' })
            await Pages.create({ item: 'third', img: 'slider3.jpg' })
            await Pages.create({ item: 'fourth', img: 'slider4.jpg' })
            await Pages.create({ item: 'fifth', img: 'slider5.jpg' })
        }

        const pages = await Pages.findAll(
            {
                where: { item: { [Op.like]: '%footer%' } },
                order: ['item']
            }
        )
        return res.json(pages)
    }

    async getOne(req, res) {
        const { item } = req.params

        if ((await Pages.findAll()).length == 0) {
            await Pages.create({ item: 'mainText', text: mainText })
            await Pages.create({ item: 'book' })
            await Pages.create({ item: 'author' })
            await Pages.create({ item: 'about' })
            await Pages.create({ item: 'footer1' })
            await Pages.create({ item: 'footer2' })
            await Pages.create({ item: 'footer3' })
            await Pages.create({ item: 'footer4' })
            await Pages.create({ item: 'footer5' })
            await Pages.create({ item: 'footer6' })
            await Pages.create({ item: 'first', img: 'slider1.jpg' })
            await Pages.create({ item: 'second', img: 'slider2.jpg' })
            await Pages.create({ item: 'third', img: 'slider3.jpg' })
            await Pages.create({ item: 'fourth', img: 'slider4.jpg' })
            await Pages.create({ item: 'fifth', img: 'slider5.jpg' })
        }

        const page = await Pages.findOne(
            {
                where: { item }
            }
        )
        res.json(page)
    }

    async update(req, res, next) {
        try {
            const { mainText, book, author, about, footer1, footer2, footer3, footer4, footer5, footer6, first, second, third, fourth, fifth, firsturl, secondurl, thirdurl, fourthurl, fifthurl } = req.body
            let page

            if ((await Pages.findAll()).length == 0) {
                await Pages.create({ item: 'mainText', text: mainText })
                await Pages.create({ item: 'book' })
                await Pages.create({ item: 'author' })
                await Pages.create({ item: 'about' })
                await Pages.create({ item: 'footer1' })
                await Pages.create({ item: 'footer2' })
                await Pages.create({ item: 'footer3' })
                await Pages.create({ item: 'footer4' })
                await Pages.create({ item: 'footer5' })
                await Pages.create({ item: 'footer6' })
                await Pages.create({ item: 'first', img: 'slider1.jpg' })
                await Pages.create({ item: 'second', img: 'slider2.jpg' })
                await Pages.create({ item: 'third', img: 'slider3.jpg' })
                await Pages.create({ item: 'fourth', img: 'slider4.jpg' })
                await Pages.create({ item: 'fifth', img: 'slider5.jpg' })
            }

            page = await Pages.update({ text: mainText }, { where: { item: 'mainText' } })
            await Pages.update({ text: book }, { where: { item: 'book' } })
            await Pages.update({ text: author }, { where: { item: 'author' } })
            await Pages.update({ text: about }, { where: { item: 'about' } })
            await Pages.update({ text: footer1 }, { where: { item: 'footer1' } })
            await Pages.update({ text: footer2 }, { where: { item: 'footer2' } })
            await Pages.update({ text: footer3 }, { where: { item: 'footer3' } })
            await Pages.update({ text: footer4 }, { where: { item: 'footer4' } })
            await Pages.update({ text: footer5 }, { where: { item: 'footer5' } })
            await Pages.update({ text: footer6 }, { where: { item: 'footer6' } })
            await Pages.update({ text: first, url: firsturl }, { where: { item: 'first' } })
            await Pages.update({ text: second, url: secondurl }, { where: { item: 'second' } })
            await Pages.update({ text: third, url: thirdurl }, { where: { item: 'third' } })
            await Pages.update({ text: fourth, url: fourthurl }, { where: { item: 'fourth' } })
            await Pages.update({ text: fifth, url: fifthurl }, { where: { item: 'fifth' } })
            if (req.files != null) {
                const { firstimg, secondimg, thirdimg, fourthimg, fifthimg } = req.files
                if (firstimg != undefined) {
                    firstimg.mv(path.resolve(__dirname, '..', 'static', 'slider1.jpg'))
                }
                if (secondimg != undefined) {
                    secondimg.mv(path.resolve(__dirname, '..', 'static', 'slider2.jpg'))
                }
                if (thirdimg != undefined) {
                    thirdimg.mv(path.resolve(__dirname, '..', 'static', 'slider3.jpg'))
                }
                if (fourthimg != undefined) {
                    fourthimg.mv(path.resolve(__dirname, '..', 'static', 'slider4.jpg'))
                }
                if (fifthimg != undefined) {
                    fifthimg.mv(path.resolve(__dirname, '..', 'static', 'slider5.jpg'))
                }
            }
            return res.json(page)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }

    }
}

module.exports = new pagesController()