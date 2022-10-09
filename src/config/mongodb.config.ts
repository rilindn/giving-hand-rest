import mongoose, { ConnectOptions } from 'mongoose'
import { logger } from '@utils/logger'

const dbConnection = async () => {
  const mongoUrl: string = process.env.MONGO_URL!
  try {
    await mongoose.connect(mongoUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions)
    logger.info(`Connected to mongo cluster: ${mongoose.connection.name}`)
    logger.info('==================================')
  } catch (error: any) {
    throw new Error(error.message)
  }
}
export default dbConnection
