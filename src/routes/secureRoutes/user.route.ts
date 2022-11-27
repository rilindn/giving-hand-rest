import express from 'express'
import UserController from '@controllers/user.controller'
import AuthController from '@controllers/auth.controller'
import { updateUserValidation } from '@validators/user.validation'

const UserRouter = express.Router()

UserRouter.get('/loggedUser', AuthController.loggedUser)

UserRouter.get('/', UserController.getAllUsers)
UserRouter.get('/:id', UserController.getUserById)
UserRouter.put('/:id', updateUserValidation, UserController.updateUser)
UserRouter.delete('/:id', UserController.deleteUser)

export default UserRouter
