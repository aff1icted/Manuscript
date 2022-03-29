const sequelize = require('../db.js')
const db = require('../db')
const { Book, Tags, Authors, Series, BookTag, BookAuthor, BookSeries } = require('../models/models')
const uuid = require('uuid')
const path = require('path')
const ApiError = require('../error/ApiError')




// переделать на sequelize

class BookController {
    /*async createBook(req,res){
        
        const{ISBN, Title, PublicationDate, Format, Cover, CoverArt, ShortPDF, FullPDF, Edition, PageNumber, Description}=req.body
        //const newBook = await db.query('INSERT INTO "Book" ("ISBN", "Title") values ($1,$2) RETURNING *',[ISBN, Title, PublicationDate, Format, Cover, CoverArt, ShortPDF, FullPDF, Edition, PageNumber, Description])
        //const newBook = await db.query('INSERT INTO "Book" ("ISBN", "Title") values ($1,$2) RETURNING *',[ISBN, Title])
        const newBook = await sequelize.query(`INSERT INTO books(isbn, title) 
            values ($1,$2) RETURNING *`,[ISBN, Title])
        res.json(newBook.rows[0])
    }*/

    async create(req, res, next) {

        const { isbn, title, publicationdate, edition, pagenumber, description, price, tags, authors, series, formatName, coverCover } = req.body
        let coverartName
        let shortpdfName
        let fullpdfName

        if (req.files != null) {
            const { coverart, shortpdf, fullpdf } = req.files

            coverartName = uuid.v4() + ".jpg"
            coverart.mv(path.resolve(__dirname, '..', 'static', coverartName))

            shortpdfName = uuid.v4() + ".pdf"
            shortpdf.mv(path.resolve(__dirname, '..', 'static', shortpdfName))

            fullpdfName = uuid.v4() + ".pdf"
            fullpdf.mv(path.resolve(__dirname, '..', 'static', fullpdfName))

        } else {
            coverartName = 'noimg'
            shortpdfName = 'nofile'
            fullpdfName = 'nofile'
        }



        const candidate = await Book.findOne({ where: { isbn } })
        if (candidate) {
            return next(ApiError.badRequest('Такая книга уже существует'))
        }

        const book = await Book.create({ isbn, title, publicationdate, coverart: coverartName, shortpdf: shortpdfName, fullpdf: fullpdfName, edition, pagenumber, description, price, formatName, coverCover })

        if (tags) {
            const tag = JSON.parse(tags)
            tag.forEach(i => {
                BookTag.create({
                    bookIsbn: isbn,
                    tagTagname: i.tagname
                })
            });
        }

        if (authors) {
            const author = JSON.parse(authors)
            author.forEach(i => {
                BookAuthor.create({
                    bookIsbn: isbn,
                    authorFullname: i.fullname
                })
            });
        }

        if (series) {
            const ser = JSON.parse(series)
            ser.forEach(i => {
                BookSeries.create({
                    bookIsbn: isbn,
                    seriesSeriesname: i.seriesname
                })
            });
        }

        return res.json({ book })

    }
    async getAll(req, res) {

        const books = await Book.findAll({ include: [Tags, Authors, Series] })
        return res.json(books)

    }
    async getOne(req, res) {
        const { isbn } = req.params
        const book = await Book.findAll(
            {
                where: { isbn },
                include: [Tags, Authors, Series]
            }
        )
        res.json(book)
    }
    // не рабочая хуита, не знаю как сделать изменения связей
    async update(req, res) {
        const { isbn, title, pagenumber, edition, price, description} = req.body
        const book = await Book.update({ isbn, pagenumber, edition, price, description}, {where: { title } })
        res.json(book.rows[0])
    }

    
    
    



    async delete(req, res) {
        const { title } = req.params
        const book = await Book.destroy(
            {
                where: { title }
            }
        )
        return res.json(book)
    }
   
}

module.exports = new BookController()