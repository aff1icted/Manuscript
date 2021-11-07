const express = require('express')
const config = require('config')
const bookRouter = require('./routes/book.routes')

const app = express()

app.use(express.json())
app.use('/',bookRouter)

const PORT = config.get('port')
app.listen(PORT, () => console.log(`app started ${PORT}`))