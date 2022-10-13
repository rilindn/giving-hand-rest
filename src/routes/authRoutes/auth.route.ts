import express from 'express'
import AuthController from '@controllers/auth.controller'
import { registerUserValidation } from '@validators/user.validation'

const UserRouter = express.Router()

UserRouter.post(
  '/register',
  registerUserValidation,
  AuthController.registerUser,
)
UserRouter.post('/login', AuthController.login)

export default UserRouter
