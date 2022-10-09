import Joi from 'joi'
import { RequestHandler } from 'express';
import validator from '../middleware/validator';

const registerSchema = Joi.object({
  name: Joi.string().min(2).max(30).required()
    .label('Firstname'),
})

export const registerUserValidation: RequestHandler = (req, res, next) => validator(registerSchema, req.body, next);

export default { registerUserValidation }
