const db = require('../db')

class BookController{
    async createBook(req,res){
        const{ISBN, Title, PublicationDate, Format, Cover, CoverArt, ShortPDF, FullPDF, Edition, PageNumber, Description}=req.body
        //const newBook = await db.query('INSERT INTO "Book" ("ISBN", "Title") values ($1,$2) RETURNING *',[ISBN, Title, PublicationDate, Format, Cover, CoverArt, ShortPDF, FullPDF, Edition, PageNumber, Description])
        const newBook = await db.query('INSERT INTO "Book" ("ISBN", "Title") values ($1,$2) RETURNING *',[ISBN, Title])
        res.json(newBook.rows[0])
    }
    async getBooks(req,res){
        const books = await db.query('SELECT * FROM "Book"')
        res.json(books.rows)
    }
    async getOneBook(req,res){
        const isbn = req.params.isbn
        const book = await db.query('SELECT * FROM "Book" WHERE "ISBN"=$1',[isbn])
        res.json(book.rows)
    }
    async updateBook(req,res){
        const{ISBN, Title, PublicationDate, Format, Cover, CoverArt, ShortPDF, FullPDF, Edition, PageNumber, Description}=req.body
        //const book = await db.query('UPDATE "Book" SET "Title"=$2, "PublicationDate"=$3, "Format"=$4, "Cover"=$5, "CoverArt"=$6, "ShortPDF"=$7, "FullPDF"=$8, "Edition"=$9, "PageNumber"=$9, "Description"=$10 WHERE "ISBN"=$1 RETURNING *',[ISBN, Title, PublicationDate, Format, Cover, CoverArt, ShortPDF, FullPDF, Edition, PageNumber, Description])
        const book = await db.query('UPDATE "Book" SET "Title"=$2 WHERE "ISBN"=$1 RETURNING *',[ISBN, Title])
        res.json(book.rows[0])
    }
    async deleteBook(req,res){
        const isbn = req.params.isbn
        const book = await db.query('DELETE FROM "Book" WHERE "ISBN"=$1',[isbn])
        res.json(book.rows)
    }
}

module.exports = new BookController()