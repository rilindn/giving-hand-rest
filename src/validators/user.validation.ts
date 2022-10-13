import Joi from 'joi'
import { RequestHandler } from 'express'
import validator from '@middleware/validator.middleware'

const registerSchema = Joi.object({
  firstName: Joi.string().min(2).max(30).required()
    .label('Firstname'),
  lastName: Joi.string().min(2).max(30).required()
    .label('Lastname'),
  email: Joi.string().email().min(5).max(30)
    .required()
    .label('Email'),
  password: Joi.string().alphanum().min(7).max(30)
    .required()
    .label('Password'),
})

const updateSchema = Joi.object({
  userId: Joi.string().required().label('ID'),
  firstName: Joi.string().min(2).max(30).label('Firstname'),
  lastName: Joi.string().min(2).max(30).label('Lastname'),
  email: Joi.string().email().min(5).max(30)
    .label('Email'),
  password: Joi.string().alphanum().min(7).max(30)
    .label('Password'),
})

export const registerUserValidation: RequestHandler = (req, res, next) => validator(registerSchema, req.body, next)
export const updateUserValidation: RequestHandler = (req, res, next) => validator(updateSchema, { ...req.body, userId: req.params.id }, next)

export default { registerUserValidation, updateUserValidation }
