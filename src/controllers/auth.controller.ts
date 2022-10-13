import passport from 'passport'
import { Request, Response, NextFunction } from 'express'
import { IUser } from '@interfaces/user.interface'
import UserService from '@services/user.service'
import AuthService from '@services/auth.service'
import HttpException from '@utils/HttpException'
import { AuthRequest } from '@/@types/index'

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
    const users: IUser[] = await AuthService.registerUser(req.body)
    return res.send(users)
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

export default {
  login,
  registerUser,
  loggedUser,
}
