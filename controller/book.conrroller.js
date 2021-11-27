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

    async create(req, res) {

        const { isbn, title, publicationdate, edition, pagenumber, description, price, tags, authors, series,formatName,coverCover } = req.body
        const { coverart, shortpdf, fullpdf} = req.files

        let coverartName = uuid.v4() + ".jpg"
        coverart.mv(path.resolve(__dirname, '..', 'static', coverartName))

        let shortpdfName = uuid.v4() + ".pdf"
        shortpdf.mv(path.resolve(__dirname, '..', 'static', shortpdfName))

        let fullpdfName = uuid.v4() + ".pdf"
        fullpdf.mv(path.resolve(__dirname, '..', 'static', fullpdfName))

        const book = await Book.create({ isbn, title, publicationdate, coverart: coverartName, shortpdf: shortpdfName, fullpdf: fullpdfName, edition, pagenumber, description, price,formatName,coverCover })

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
    async getOneBook(req, res) {
        const { isbn } = req.params
        const book = await Book.findAll(
            {
                where: { isbn },
                include: [Tags, Authors, Series]
            }
        )
        res.json(book)
    }
    async updateBook(req, res) {
        const { ISBN, Title, PublicationDate, Format, Cover, CoverArt, ShortPDF, FullPDF, Edition, PageNumber, Description } = req.body
        //const book = await db.query('UPDATE "Book" SET "Title"=$2, "PublicationDate"=$3, "Format"=$4, "Cover"=$5, "CoverArt"=$6, "ShortPDF"=$7, "FullPDF"=$8, "Edition"=$9, "PageNumber"=$9, "Description"=$10 WHERE "ISBN"=$1 RETURNING *',[ISBN, Title, PublicationDate, Format, Cover, CoverArt, ShortPDF, FullPDF, Edition, PageNumber, Description])
        const book = await sequelize.query('UPDATE "Book" SET "Title"=$2 WHERE "ISBN"=$1 RETURNING *', [ISBN, Title])
        res.json(book.rows[0])
    }
    async deleteBook(req, res) {
        const isbn = req.params.isbn
        const book = await sequelize.query('DELETE FROM "Book" WHERE "ISBN"=$1', [isbn])
        res.json(book.rows)
    }
}

module.exports = new BookController()