const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const bodyParser = require('body-parser')
const cors = require('cors')

app.use(cors())
app.use(bodyParser.json())
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'))

const postRoutes = require('./src/routes/post')
app.use('/post', postRoutes)


const listener = () => console.log(`Listening on port ${port}!`)
app.listen(port, listener)
