import createHttpError from 'http-errors'
import { NextFunction } from 'express'
import Joi from 'joi'
import { logger } from '@utils/logger';

const validator = async (schema: Joi.ObjectSchema, body: object, next: NextFunction) => {
  const value = await schema.validate(body)

  try {
    if (value.error) {
      next(createHttpError(422, value.error.details[0].message))
    } else next()
  } catch (error) {
    logger.error(error)
  }
}

export default validator
