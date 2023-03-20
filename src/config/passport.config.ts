import passport from 'passport'
import passportLocal from 'passport-local'
import bcrypt from 'bcrypt'
import passportJwt, { VerifiedCallback } from 'passport-jwt'
import { IUser } from '../interfaces/user.interface'
import User from '../models/user.model'
import { ACCESS_TOKEN_SECRET } from './env.config'

const LocalStrategy = passportLocal.Strategy
const JwtStrategy = passportJwt.Strategy
const { ExtractJwt } = passportJwt

const authFields = {
  usernameField: 'email',
  passwordField: 'password',
}

passport.use(
  new LocalStrategy(
    authFields,
    async (
      email: string,
      password: string | Buffer,
      done: VerifiedCallback,
    ) => {
      const user: IUser = await User.findOne({ email }).select('+password')
      if (!user) {
        return done(null, false)
      }
      if (!(await bcrypt.compare(password, user.password))) {
        return done(null, false)
      }
      return done(null, user)
    },
  ),
)

passport.use(
  new JwtStrategy(
    {
      secretOrKey: ACCESS_TOKEN_SECRET,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    },
    async (token: any, done: VerifiedCallback) => {
      try {
        return done(null, token.user)
      } catch (error) {
        done(error)
      }
    },
  ),
)
