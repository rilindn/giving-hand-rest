import Joi from 'joi'
import { RequestHandler } from 'express'
import validator from '@middleware/validator.middleware'

const registerSchema = Joi.object({
  firstName: Joi.string().required().label('Firstname'),
  lastName: Joi.string().required().label('Lastname'),
  email: Joi.string().email().required().label('Email'),
  password: Joi.string().min(8).required().label('Password'),
  gender: Joi.string().required().label('Gender'),
  birthDate: Joi.string().optional().allow(null).allow('').label('Birthdate'),
})

const updateSchema = Joi.object({
  userId: Joi.string().required().label('ID'),
  firstName: Joi.string().min(2).max(30).label('Firstname'),
  lastName: Joi.string().min(2).max(30).label('Lastname'),
  email: Joi.string().email().min(5).max(30).label('Email'),
  password: Joi.string().alphanum().min(7).max(30).label('Password'),
})

const resetPasswordSchema = Joi.object({
  email: Joi.string().email().min(5).max(30).label('Email'),
  resetToken: Joi.string().required().label('Reset Token'),
  password: Joi.string().alphanum().min(7).max(30).label('Password'),
})

export const registerUserValidation: RequestHandler = (req, res, next) =>
  validator(registerSchema, req.body, next)
export const updateUserValidation: RequestHandler = (req, res, next) =>
  validator(updateSchema, { ...req.body, userId: req.params.id }, next)
export const resetPasswordValidation: RequestHandler = (req, res, next) =>
  validator(resetPasswordSchema, { ...req.body }, next)

export default {
  registerUserValidation,
  updateUserValidation,
  resetPasswordValidation,
}
