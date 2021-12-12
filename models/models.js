const sequelize = require('../db.js')
const {DataTypes} = require('sequelize')

const Book = sequelize.define('books',{
    isbn:{type: DataTypes.STRING, primaryKey: true},
    title:{type: DataTypes.STRING},
    publicationdate:{type: DataTypes.DATEONLY},
    coverart:{type: DataTypes.STRING},
    shortpdf:{type: DataTypes.STRING},
    fullpdf:{type: DataTypes.STRING},
    edition:{type: DataTypes.INTEGER},
    pagenumber:{type: DataTypes.INTEGER},
    description:{type: DataTypes.TEXT},
    price:{type: DataTypes.REAL}
});

const Format = sequelize.define('format',{
    name:{type: DataTypes.STRING, primaryKey: true},
    transfercoeff:{type: DataTypes.REAL},    
});

const Covers = sequelize.define('covers',{
    cover:{type: DataTypes.STRING, primaryKey: true},    
});

const Authors = sequelize.define('authors',{
    fullname:{type: DataTypes.STRING, primaryKey: true},
    about:{type: DataTypes.TEXT},
    photo:{type: DataTypes.STRING},
    video:{type: DataTypes.STRING}
});

const Series = sequelize.define('series',{
    seriesname:{type: DataTypes.STRING, primaryKey: true},
    foundation:{type: DataTypes.DATEONLY},
    seriespic:{type: DataTypes.STRING}
});

const Tags = sequelize.define('tags',{
    tagname:{type: DataTypes.STRING, primaryKey: true}
});

const BookAuthor = sequelize.define('bookauthor',{
    id:{type: DataTypes.INTEGER, primaryKey:true, autoIncrement: true}
});

const BookSeries = sequelize.define('bookseries',{
    id:{type: DataTypes.INTEGER, primaryKey:true, autoIncrement: true}
});

const BookTag = sequelize.define('booktag',{
    id:{type: DataTypes.INTEGER, primaryKey:true, autoIncrement: true}
});

const User = sequelize.define('user', {
    username: {type: DataTypes.STRING, primaryKey: true},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "USER"},
})

Format.hasMany(Book)
Book.belongsTo(Format)

Covers.hasMany(Book)
Book.belongsTo(Covers)

Book.belongsToMany(Authors,{through: BookAuthor})
Authors.belongsToMany(Book,{through: BookAuthor})

Book.belongsToMany(Series,{through: BookSeries})
Series.belongsToMany(Book,{through: BookSeries})

Book.belongsToMany(Tags,{through: BookTag})
Tags.belongsToMany(Book,{through: BookTag})


module.exports = {
    Book,
    Format,
    Covers,
    Authors,
    Series,
    Tags,
    BookAuthor,
    BookSeries,
    BookTag,
    User
}