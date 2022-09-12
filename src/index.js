const express = require('express')
const cors = require('cors')
const mongoDbConfig = require('./config/mongodb.config')
const router = require('./routes')

require('dotenv').config()
const PORT = process.env.PORT || 3000

const app = express()

// connect to mongo
mongoDbConfig()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

app.use('/', router)

app.listen(PORT, () => {
  console.log(`Server is running in port ${PORT}`)
})

module.exports = app
