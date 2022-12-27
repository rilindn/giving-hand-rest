'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
const tslib_1 = require('tslib')
const passport_1 = tslib_1.__importDefault(require('passport'))
const user_service_1 = tslib_1.__importDefault(
  require('../services/user.service'),
)
const auth_service_1 = tslib_1.__importDefault(
  require('../services/auth.service'),
)
const resetToken_service_1 = tslib_1.__importDefault(
  require('../services/resetToken.service'),
)
const sendMail_1 = tslib_1.__importDefault(require('../utils/email/sendMail'))
function login(req, res, next) {
  return tslib_1.__awaiter(this, void 0, void 0, function* () {
    passport_1.default.authenticate('local', (err, user) =>
      tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
          if (err || !user) {
            return res
              .status(401)
              .send('Invalid credentials! Please try again!')
          }
          req.login(user, { session: false }, (error) =>
            tslib_1.__awaiter(this, void 0, void 0, function* () {
              if (error) return next(error)
              const payload = auth_service_1.default.signTokenPayload(user)
              return res.json(payload)
            }),
          )
        } catch (error) {
          return next(error)
        }
      }),
    )(req, res, next)
  })
}
function registerUser(req, res, next) {
  return tslib_1.__awaiter(this, void 0, void 0, function* () {
    try {
      const user = yield user_service_1.default.registerUser(req.body)
      return res.send(user)
    } catch (error) {
      next(error)
    }
  })
}
function loggedUser(req, res, next) {
  return tslib_1.__awaiter(this, void 0, void 0, function* () {
    const id = req.user.userId
    try {
      const user = yield user_service_1.default.getUserById(id)
      return res.send(user)
    } catch (error) {
      next(error)
    }
  })
}
function requestResetPassword(req, res, next) {
  return tslib_1.__awaiter(this, void 0, void 0, function* () {
    try {
      const { email } = req.body
      const { user, token } = yield auth_service_1.default.composeResetToken(
        email,
      )
      const magicLink = auth_service_1.default.composeMagicLink(email, token)
      const { transporter, mailOptions } = yield (0, sendMail_1.default)(
        user,
        magicLink,
      )
      return transporter.sendMail(mailOptions, (err, result) => {
        if (err) {
          next(err)
        }
        return res.send({ result })
      })
    } catch (error) {
      next(error)
    }
  })
}
function validateResetToken(req, res, next) {
  return tslib_1.__awaiter(this, void 0, void 0, function* () {
    const { token, email } = req.body
    try {
      const result = yield auth_service_1.default.validateResetToken(
        email,
        token,
      )
      return res.send(result)
    } catch (error) {
      next(error)
    }
  })
}
function resetPassword(req, res, next) {
  return tslib_1.__awaiter(this, void 0, void 0, function* () {
    const { email, resetToken: token, password } = req.body
    try {
      const user = yield auth_service_1.default.resetPassword(
        token,
        password,
        email,
      )
      return res.send(user)
    } catch (error) {
      next(error)
    }
  })
}
function deleteToken(req, res, next) {
  return tslib_1.__awaiter(this, void 0, void 0, function* () {
    try {
      const user = yield resetToken_service_1.default.deleteInvalidResetToken()
      return res.send(user)
    } catch (error) {
      next(error)
    }
  })
}
exports.default = {
  login,
  registerUser,
  loggedUser,
  requestResetPassword,
  validateResetToken,
  resetPassword,
  deleteToken,
}
//# sourceMappingURL=auth.controller.js.map
