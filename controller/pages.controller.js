const ApiError = require('../error/ApiError')
const { Pages } = require('../models/models');
const path = require('path');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

class pagesController {

    async getAll(req, res) {

        

        if ((await Pages.findAll()).length == 0) {
            await Pages.create({ item: 'mainText' })
            await Pages.create({ item: 'book' })
            await Pages.create({ item: 'author' })
            await Pages.create({ item: 'about' })
            await Pages.create({ item: 'order' })
            await Pages.create({ item: 'footer1' })
            await Pages.create({ item: 'footer2' })
            await Pages.create({ item: 'footer3' })
            await Pages.create({ item: 'footer4' })
            await Pages.create({ item: 'footer5' })
            await Pages.create({ item: 'footer6' })
            await Pages.create({ item: 'banner1', img: 'slider1.jpg' })
            await Pages.create({ item: 'banner2', img: 'slider2.jpg' })
            await Pages.create({ item: 'banner3', img: 'slider3.jpg' })
            await Pages.create({ item: 'banner4', img: 'slider4.jpg' })
            await Pages.create({ item: 'banner5', img: 'slider5.jpg' })
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
            await Pages.create({ item: 'order' })
            await Pages.create({ item: 'footer1' })
            await Pages.create({ item: 'footer2' })
            await Pages.create({ item: 'footer3' })
            await Pages.create({ item: 'footer4' })
            await Pages.create({ item: 'footer5' })
            await Pages.create({ item: 'footer6' })
            await Pages.create({ item: 'banner1', img: 'slider1.jpg' })
            await Pages.create({ item: 'banner2', img: 'slider2.jpg' })
            await Pages.create({ item: 'banner3', img: 'slider3.jpg' })
            await Pages.create({ item: 'banner4', img: 'slider4.jpg' })
            await Pages.create({ item: 'banner5', img: 'slider5.jpg' })
        }

        
        const pages = await Pages.findAll(
            {
                where: { item: { [Op.like]: '%footer%' } },
                order: ['item']
            }
        )
        return res.json(pages)
    }

    async getbanner(req, res) {

        if ((await Pages.findAll()).length == 0) {
            await Pages.create({ item: 'mainText', text: mainText })
            await Pages.create({ item: 'book' })
            await Pages.create({ item: 'author' })
            await Pages.create({ item: 'about' })
            await Pages.create({ item: 'order' })
            await Pages.create({ item: 'footer1' })
            await Pages.create({ item: 'footer2' })
            await Pages.create({ item: 'footer3' })
            await Pages.create({ item: 'footer4' })
            await Pages.create({ item: 'footer5' })
            await Pages.create({ item: 'footer6' })
            await Pages.create({ item: 'banner1', img: 'slider1.jpg' })
            await Pages.create({ item: 'banner2', img: 'slider2.jpg' })
            await Pages.create({ item: 'banner3', img: 'slider3.jpg' })
            await Pages.create({ item: 'banner4', img: 'slider4.jpg' })
            await Pages.create({ item: 'banner5', img: 'slider5.jpg' })
        }



        const pages = await Pages.findAll(
            {
                where: { item: { [Op.like]: '%banner%' } },
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
            await Pages.create({ item: 'order' })
            await Pages.create({ item: 'footer1' })
            await Pages.create({ item: 'footer2' })
            await Pages.create({ item: 'footer3' })
            await Pages.create({ item: 'footer4' })
            await Pages.create({ item: 'footer5' })
            await Pages.create({ item: 'footer6' })
            await Pages.create({ item: 'banner1', img: 'slider1.jpg' })
            await Pages.create({ item: 'banner2', img: 'slider2.jpg' })
            await Pages.create({ item: 'banner3', img: 'slider3.jpg' })
            await Pages.create({ item: 'banner4', img: 'slider4.jpg' })
            await Pages.create({ item: 'banner5', img: 'slider5.jpg' })
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
            const { mainText, book, author, about, order, footer1, footer2, footer3, footer4, footer5, footer6, banner1, banner2, banner3, banner4, banner5, firsturl, secondurl, thirdurl, fourthurl, fifthurl } = req.body
            let page

            if ((await Pages.findAll()).length == 0) {
                await Pages.create({ item: 'mainText', text: mainText })
                await Pages.create({ item: 'book' })
                await Pages.create({ item: 'author' })
                await Pages.create({ item: 'about' })
                await Pages.create({ item: 'order' })
                await Pages.create({ item: 'footer1' })
                await Pages.create({ item: 'footer2' })
                await Pages.create({ item: 'footer3' })
                await Pages.create({ item: 'footer4' })
                await Pages.create({ item: 'footer5' })
                await Pages.create({ item: 'footer6' })
                await Pages.create({ item: 'banner1', img: 'slider1.jpg' })
                await Pages.create({ item: 'banner2', img: 'slider2.jpg' })
                await Pages.create({ item: 'banner3', img: 'slider3.jpg' })
                await Pages.create({ item: 'banner4', img: 'slider4.jpg' })
                await Pages.create({ item: 'banner5', img: 'slider5.jpg' })
            }

            page = await Pages.update({ text: mainText }, { where: { item: 'mainText' } })
            await Pages.update({ text: book }, { where: { item: 'book' } })
            await Pages.update({ text: author }, { where: { item: 'author' } })
            await Pages.update({ text: about }, { where: { item: 'about' } })
            await Pages.update({ text: order }, { where: { item: 'order' } })
            await Pages.update({ text: footer1 }, { where: { item: 'footer1' } })
            await Pages.update({ text: footer2 }, { where: { item: 'footer2' } })
            await Pages.update({ text: footer3 }, { where: { item: 'footer3' } })
            await Pages.update({ text: footer4 }, { where: { item: 'footer4' } })
            await Pages.update({ text: footer5 }, { where: { item: 'footer5' } })
            await Pages.update({ text: footer6 }, { where: { item: 'footer6' } })
            await Pages.update({ text: banner1, url: firsturl }, { where: { item: 'banner1' } })
            await Pages.update({ text: banner2, url: secondurl }, { where: { item: 'banner2' } })
            await Pages.update({ text: banner3, url: thirdurl }, { where: { item: 'banner3' } })
            await Pages.update({ text: banner4, url: fourthurl }, { where: { item: 'banner4' } })
            await Pages.update({ text: banner5, url: fifthurl }, { where: { item: 'banner5' } })
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