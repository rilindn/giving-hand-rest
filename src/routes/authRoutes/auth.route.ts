import express from 'express'
import AuthController from '../../controllers/auth.controller'
import {
  registerUserValidation,
  resetPasswordValidation,
} from '../../validators/user.validation'

const UserRouter = express.Router()

UserRouter.post(
  '/register',
  registerUserValidation,
  AuthController.registerUser,
)
UserRouter.post('/login', AuthController.login)
UserRouter.post('/password/request-reset', AuthController.requestResetPassword)
UserRouter.post('/password/validate-token', AuthController.validateResetToken)
UserRouter.post(
  '/password/reset',
  resetPasswordValidation,
  AuthController.resetPassword,
)

export default UserRouter
