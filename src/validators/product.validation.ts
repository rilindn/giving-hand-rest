import Joi from 'joi'
import { RequestHandler } from 'express'
import validator from '@middleware/validator.middleware'

const registerSchema = Joi.object({
  title: Joi.string().required().label('Title'),
  description: Joi.string().required().label('Description'),
  images: Joi.array()
    .items(
      Joi.object({
        url: Joi.string().required(),
      }),
    )
    .label('Images'),
  categories: Joi.array().items(Joi.string().required()).label('Categories'),
  location: Joi.object({
    lat: Joi.number().required(),
    lng: Joi.number().required(),
    address: Joi.string().required(),
  }).label('Location'),
  userId: Joi.string().required().label('User ID'),
})

const updateSchema = Joi.object({
  productId: Joi.string().required().label('Product ID'),
  title: Joi.string().label('Title'),
  description: Joi.string().label('Description'),
  images: Joi.array()
    .items(
      Joi.object({
        url: Joi.string().required(),
      }),
    )
    .label('Images'),
  categories: Joi.array().items(Joi.string().required()).label('Categories'),
  location: Joi.object({
    lat: Joi.number().required(),
    lng: Joi.number().required(),
    address: Joi.string().required(),
  }).label('Location'),
  userId: Joi.string().label('User ID'),
})

export const createProductValidation: RequestHandler = (req, res, next) =>
  validator(registerSchema, req.body, next)
export const updateProductValidation: RequestHandler = (req, res, next) =>
  validator(updateSchema, { ...req.body, productId: req.params.id }, next)

export default {
  createProductValidation,
  updateProductValidation,
}
