import { ErrorRequestHandler, NextFunction, Request, Response } from 'express'
import HttpException from '../utils/HttpException'
import { logger } from '../utils/logger'

const errorHandler: ErrorRequestHandler = (
  error: HttpException,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const status: number = error.status || 500
    const message: string = error.message || 'Something went wrong'

    logger.error(
      `[${req.method}] ${req.path} >> StatusCode:: ${status}, Message:: ${message}`,
    )
    res.status(status).json({ message })
  } catch (err) {
    next(err)
  }
}

export default errorHandler
