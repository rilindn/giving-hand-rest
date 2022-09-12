const mongoose = require('mongoose')

const dbConnection = async () => {
  const mongoUrl = process.env.MONGO_URL
  try {
    await mongoose.connect(mongoUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.info(`Connected to db: ${mongoose.connection.name}`)
  } catch (error) {
    throw new Error(error.message)
  }
}

module.exports = dbConnection
