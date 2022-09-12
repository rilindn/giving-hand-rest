const express = require('express')
const UserController = require('../controllers/user.controller')

const UserRouter = express.Router()

UserRouter.get('/', UserController.getAllUsers)

module.exports = UserRouter
