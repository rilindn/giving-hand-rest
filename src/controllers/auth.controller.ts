import passport from 'passport'
import { Request, Response, NextFunction } from 'express'
import { IUser, IUserSearch } from '../interfaces/user.interface'
import UserService from '../services/user.service'
import AuthService from '../services/auth.service'
import HttpException from '../utils/HttpException'
import ResetTokenService from '../services/resetToken.service'
import { GmailTransporter } from '../interfaces/mailTransporter.interface'
import constructEmailTransporter from '../utils/email/sendMail'
import { AuthRequest } from '../@types/index'

async function login(req: Request, res: Response, next: NextFunction) {
  passport.authenticate('local', async (err: HttpException, user: IUser) => {
    try {
      if (err || !user) {
        return res.status(401).send('Invalid credentials! Please try again!')
      }
      req.login(user, { session: false }, async (error: HttpException) => {
        if (error) return next(error)
        const payload = AuthService.signTokenPayload(user)
        return res.json(payload)
      })
    } catch (error) {
      return next(error)
    }
  })(req, res, next)
}

async function registerUser(req: Request, res: Response, next: NextFunction) {
  try {
    const user: IUser = await UserService.registerUser(req.body)
    return res.send(user)
  } catch (error) {
    next(error)
  }
}

async function loggedUser(req: AuthRequest, res: Response, next: NextFunction) {
  const id: string = req.user.userId
  try {
    const user: IUser = await UserService.getUserById(id)
    return res.send(user)
  } catch (error) {
    next(error)
  }
}

async function requestResetPassword(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { email }: IUserSearch = req.body
    const { user, token } = await AuthService.composeResetToken(email)

    const magicLink = AuthService.composeMagicLink(email, token)
    const { transporter, mailOptions }: GmailTransporter =
      await constructEmailTransporter(user, magicLink)

    return transporter.sendMail(mailOptions, (err, result) => {
      if (err) {
        next(err)
      }
      return res.send({ result })
    })
  } catch (error) {
    next(error)
  }
}

async function validateResetToken(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { token, email } = req.body
  try {
    const result = await AuthService.validateResetToken(email, token)
    return res.send(result)
  } catch (error) {
    next(error)
  }
}

async function resetPassword(req: Request, res: Response, next: NextFunction) {
  const { email, resetToken: token, password } = req.body
  try {
    const user = await AuthService.resetPassword(token, password, email)
    return res.send(user)
  } catch (error) {
    next(error)
  }
}

async function deleteToken(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await ResetTokenService.deleteInvalidResetToken()
    return res.send(user)
  } catch (error) {
    next(error)
  }
}

export default {
  login,
  registerUser,
  loggedUser,
  requestResetPassword,
  validateResetToken,
  resetPassword,
  deleteToken,
}
