import express from 'express'
import UserController from '@controllers/user.controller'
import { registerUserValidation } from '@/validators/user.validation'

const UserRouter = express.Router()

UserRouter.get('/', UserController.getAllUsers)

UserRouter.post('/', registerUserValidation, UserController.registerUser)

export default UserRouter
