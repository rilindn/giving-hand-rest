import { NextFunction } from 'express';
import Joi from 'joi';
declare const validator: (schema: Joi.ObjectSchema, body: object, next: NextFunction) => Promise<void>;
export default validator;
