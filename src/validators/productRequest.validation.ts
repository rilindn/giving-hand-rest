import Joi from 'joi'
import { RequestHandler } from 'express'
import validator from '@middleware/validator.middleware'

const registerSchema = Joi.object({
  description: Joi.string().required().label('Description'),
  userId: Joi.string().required().label('User ID'),
  status: Joi.string().required().label('Status'),
  productId: Joi.string().required().label('Product ID'),
})

const updateSchema = Joi.object({
  productRequestId: Joi.string().required().label('Product Request ID'),
  description: Joi.string().label('Description'),
  status: Joi.string().label('Status'),
  userId: Joi.string().label('User ID'),
  productId: Joi.string().label('Product ID'),
})

export const createProductRequestValidation: RequestHandler = (
  req,
  res,
  next,
) => validator(registerSchema, req.body, next)
export const updateProductRequestValidation: RequestHandler = (
  req,
  res,
  next,
) =>
  validator(
    updateSchema,
    { ...req.body, productRequestId: req.params.id },
    next,
  )

export default {
  createProductRequestValidation,
  updateProductRequestValidation,
}
