'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
const tslib_1 = require('tslib')
const passport_1 = tslib_1.__importDefault(require('passport'))
const passport_local_1 = tslib_1.__importDefault(require('passport-local'))
const bcrypt_1 = tslib_1.__importDefault(require('bcrypt'))
const passport_jwt_1 = tslib_1.__importDefault(require('passport-jwt'))
const user_model_1 = tslib_1.__importDefault(require('../models/user.model'))
const env_config_1 = require('./env.config')
const LocalStrategy = passport_local_1.default.Strategy
const JwtStrategy = passport_jwt_1.default.Strategy
const { ExtractJwt } = passport_jwt_1.default
const authFields = {
  usernameField: 'email',
  passwordField: 'password',
}
passport_1.default.use(
  new LocalStrategy(authFields, (email, password, done) =>
    tslib_1.__awaiter(void 0, void 0, void 0, function* () {
      const user = yield user_model_1.default
        .findOne({ email })
        .select('+password')
      if (!user) {
        return done(null, false)
      }
      if (!(yield bcrypt_1.default.compare(password, user.password))) {
        return done(null, false)
      }
      return done(null, user)
    }),
  ),
)
passport_1.default.use(
  new JwtStrategy(
    {
      secretOrKey: env_config_1.ACCESS_TOKEN_SECRET,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    },
    (token, done) =>
      tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        try {
          return done(null, token.user)
        } catch (error) {
          done(error)
        }
      }),
  ),
)
//# sourceMappingURL=passport.config.js.map
