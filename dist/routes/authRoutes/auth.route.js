'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
const tslib_1 = require('tslib')
const express_1 = tslib_1.__importDefault(require('express'))
const auth_controller_1 = tslib_1.__importDefault(
  require('../../controllers/auth.controller'),
)
const user_validation_1 = require('../../validators/user.validation')
const UserRouter = express_1.default.Router()
UserRouter.post(
  '/register',
  user_validation_1.registerUserValidation,
  auth_controller_1.default.registerUser,
)
UserRouter.post('/login', auth_controller_1.default.login)
UserRouter.post(
  '/password/request-reset',
  auth_controller_1.default.requestResetPassword,
)
UserRouter.post(
  '/password/validate-token',
  auth_controller_1.default.validateResetToken,
)
UserRouter.post(
  '/password/reset',
  user_validation_1.resetPasswordValidation,
  auth_controller_1.default.resetPassword,
)
exports.default = UserRouter
//# sourceMappingURL=auth.route.js.map
