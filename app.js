require('dotenv').config()
const express = require('express')
const config = require('config')
const bookRouter = require('./routes/book.routes')
const sequelize = require('./db.js')
const models = require('./models/models.js')
const router = require('./routes/index')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const errorHandling = require('./middleware/ErrorHandlingMiddleware')
const path = require('path')

const PORT = process.env.PORT || 5000
const app = express()
app.use(cors())
app.use(express.json())/*{extended:true} */
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))
app.use('/api', router)
app.use(errorHandling)

if (process.env.STATUS == 'production') {
    app.use('/', express.static(path.join(__dirname, 'client', 'build')))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log(`app started on port${PORT}`))
    } catch (e) {
        console.log(e)
    }
}
start()