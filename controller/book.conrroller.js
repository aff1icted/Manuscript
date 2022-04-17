const sequelize = require('../db.js')
const db = require('../db')
const { Book, Tags, Authors, Series, BookTag, BookAuthor, BookSeries } = require('../models/models')
const uuid = require('uuid')
const path = require('path')
const ApiError = require('../error/ApiError')






class BookController {

    async create(req, res, next) {

        const { isbn, title, publicationdate, edition, pagenumber, description, price, tags, authors, series, formatName, coverCover } = req.body
        let coverartName
        let shortpdfName
        let fullpdfName

        const candidate = await Book.findOne({ where: { isbn } })
        if (candidate) {
            return next(ApiError.badRequest('Такая книга уже существует'))
        }

        const book = await Book.create({ isbn, title, publicationdate, edition, pagenumber, description, price, formatName, coverCover })

        if (req.files != null) {
            const { coverart, shortpdf, fullpdf } = req.files

            if (coverart != undefined) {
                coverartName = uuid.v4() + ".jpg"
                coverart.mv(path.resolve(__dirname, '..', 'static', coverartName))
                await Book.update({ coverart: coverartName }, { where: { isbn } })
            }

            if (shortpdf != null) {
                shortpdfName = uuid.v4() + ".pdf"
                shortpdf.mv(path.resolve(__dirname, '..', 'static', shortpdfName))
                await Book.update({ shortpdf: shortpdfName }, { where: { isbn } })
            }

            if (fullpdf != null) {
                fullpdfName = uuid.v4() + ".pdf"
                fullpdf.mv(path.resolve(__dirname, '..', 'static', fullpdfName))
                await Book.update({ fullpdf: fullpdfName }, { where: { isbn } })
            }
        }

        if (tags) {
            const tag = JSON.parse(tags)
            tag.forEach(i => {
                BookTag.create({
                    bookIsbn: isbn,
                    tagTagname: i
                })
            });
        }

        if (authors) {
            const author = JSON.parse(authors)
            author.forEach(i => {
                BookAuthor.create({
                    bookIsbn: isbn,
                    authorFullname: i
                })
            });
        }

        if (series) {
            const ser = JSON.parse(series)
            ser.forEach(i => {
                BookSeries.create({
                    bookIsbn: isbn,
                    seriesSeriesname: i
                })
            });
        }

        return res.json({ book })

    }

    async getAll(req, res) {
        const { limit } = req.body
        let books
        if (limit == null) {
            books = await Book.findAll({ include: [Tags, Authors, Series] })
        } else {
            books = await Book.findAll({ include: [Tags, Authors, Series], order: ['createdAt'], limit: limit })
        }
        return res.json(books)

    }
    async getOne(req, res) {
        const { isbn } = req.params
        const book = await Book.findOne(
            {
                where: { isbn },
                include: [Tags, Authors, Series]
            }
        )
        return res.json(book)
    }
    // не рабочая хуита, не знаю как сделать изменения связей
    async update(req, res) {
        const { oldisbn, isbn, title, publicationdate, edition, pagenumber, description, price, tags, authors, series, formatName, coverCover } = req.body
        let coverartName
        let shortpdfName
        let fullpdfName

        const book = await Book.update({ isbn, title, publicationdate, edition, pagenumber, description, price, formatName, coverCover }, { where: { isbn: oldisbn } })

        if (req.files != null) {
            const { coverart, shortpdf, fullpdf } = req.files
            if (coverart != undefined) {
                coverartName = uuid.v4() + ".jpg"
                coverart.mv(path.resolve(__dirname, '..', 'static', coverartName))
                await Book.update({ coverart: coverartName }, { where: { isbn } })
            }

            if (shortpdf != null) {
                shortpdfName = uuid.v4() + ".pdf"
                shortpdf.mv(path.resolve(__dirname, '..', 'static', shortpdfName))
                await Book.update({ shortpdf: shortpdfName }, { where: { isbn } })
            }

            if (fullpdf != null) {
                fullpdfName = uuid.v4() + ".pdf"
                fullpdf.mv(path.resolve(__dirname, '..', 'static', fullpdfName))
                await Book.update({ fullpdf: fullpdfName }, { where: { isbn } })
            }
        }


        BookTag.destroy(
            {
                where: { bookIsbn: isbn }
            }
        )

        if (tags) {
            const tag = JSON.parse(tags)
            tag.forEach(i => {
                BookTag.create({
                    bookIsbn: isbn,
                    tagTagname: i
                })
            });
        }

        BookAuthor.destroy(
            {
                where: { bookIsbn: isbn }
            }
        )

        if (authors) {
            const author = JSON.parse(authors)
            author.forEach(i => {
                BookAuthor.create({
                    bookIsbn: isbn,
                    authorFullname: i
                })
            });
        }

        BookSeries.destroy(
            {
                where: { bookIsbn: isbn }
            }
        )

        if (series) {
            const ser = JSON.parse(series)
            ser.forEach(i => {
                BookSeries.create({
                    bookIsbn: isbn,
                    seriesSeriesname: i
                })
            });
        }

        return res.json({ book })
    }

    async delete(req, res) {
        const { isbn } = req.params
        const book = await Book.destroy(
            {
                where: { isbn }
            }
        )
        return res.json(book)
    }

}

module.exports = new BookController()