import Joi from 'joi'
import { RequestHandler } from 'express'
import validator from '@middleware/validator.middleware'

const registerSchema = Joi.object({
  firstUserId: Joi.string().required().label('First user ID'),
  secondUserId: Joi.string().required().label('Second user ID'),
})

const newMessageSchema = Joi.object({
  senderId: Joi.string().required().label('Sender ID'),
  receiverId: Joi.string().required().label('Receiver ID'),
  text: Joi.string().allow(null, '').label('Message text'),
  media: Joi.string().allow(null, '').label('Media'),
}).or('text', 'media')

export const createChatValidation: RequestHandler = (req, res, next) =>
  validator(registerSchema, req.body, next)

export const newMessageValidation: RequestHandler = (req, res, next) =>
  validator(newMessageSchema, req.body, next)

export default {
  createChatValidation,
  newMessageValidation,
}
