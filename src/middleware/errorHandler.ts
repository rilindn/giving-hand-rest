import {
  ErrorRequestHandler, NextFunction, Request, Response,
} from 'express'
import { logger } from '@utils/logger'
import { HttpException } from '../exceptions/HttpException';

const errorHandler: ErrorRequestHandler = (error: HttpException, req: Request, res: Response, next: NextFunction) => {
  console.log('firstasdsd')
  try {
    const status: number = error.status || 500
    const message: string = error.message || 'Something went wrong'

    logger.error(`[${req.method}] ${req.path} >> StatusCode:: ${status}, Message:: ${message}`)
    res.status(status).json({ message })
  } catch (err) {
    next(err)
  }
}

export default errorHandler
