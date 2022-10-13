import mongoose, { ConnectOptions } from 'mongoose'
import { logger } from '@utils/logger'
import createHttpError from 'http-errors'
import { MONGO_URL } from './index.config'

async function initializeMongo() {
  const mongoUrl: string = MONGO_URL
  try {
    await mongoose.connect(mongoUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions)
    logger.info(`Connected to mongo cluster: ${mongoose.connection.name}`)
    logger.info('==================================')
  } catch (error: any) {
    createHttpError(error.staus, error)
  }
}
export default initializeMongo
