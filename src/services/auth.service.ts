import jsonwebtoken from 'jsonwebtoken'
import _ from 'lodash'
import crypto from 'crypto'
import bcrypt from 'bcrypt'

import User from '../models/user.model'
import ResetTokenModel from '../models/resetToken.model'
import HttpException from '../utils/HttpException'
import UserService from './user.service'
import { IUser, IUserMongoDoc } from '../interfaces/user.interface'
import { IResetToken } from '../interfaces/resetToken.interface'
import ResetTokenService from './resetToken.service'
import { ACCESS_TOKEN_SECRET, BASE_URL, NODE_ENV } from '../config/env.config'

function signTokenPayload(user: IUser) {
  const body = { userId: user._id }
  const token = jsonwebtoken.sign({ user: body }, ACCESS_TOKEN_SECRET || '', {})
  const data = _.omit(user, ['password'])

  return { token, user: data }
}

async function composeResetToken(email: string) {
  try {
    const user: IUser = await User.findOne({ email })
    if (!user) throw new HttpException('User not found', 404)

    // delete old or expired reset codes
    await ResetTokenService.deleteInvalidResetToken(email)

    const token: string = crypto.randomBytes(100).toString('hex')
    const salt = await bcrypt.genSalt(10)
    const hashedToken: string = await bcrypt.hash(token, salt)

    const resetToken = await ResetTokenService.newResetToken({
      userId: user._id,
      email,
      token: hashedToken,
    })
    await resetToken.save()

    return { user, token }
  } catch (error) {
    throw new HttpException(error)
  }
}

async function validateResetToken(email: string, token: string) {
  try {
    const user: IUser = await User.findOne({ email })
    if (!user) throw new HttpException('User not found', 404)

    const resetToken: IResetToken = await ResetTokenModel.findOne({ email })
    if (!resetToken) {
      throw new HttpException('Invalid token', 401)
    }

    if (!(await bcrypt.compare(token, resetToken.token))) {
      throw new HttpException('Invalid or expired token', 401)
    }

    return { user, resetToken }
  } catch (error) {
    throw new HttpException(error)
  }
}

async function resetPassword(token: string, password: string, email: string) {
  try {
    const user: IUserMongoDoc = await User.findOne({ email })
    if (!user) throw new HttpException('User not found', 404)

    const resetToken: IResetToken = await ResetTokenModel.findOne({ email })
    if (!resetToken) {
      throw new HttpException('Invalid or expired token', 401)
    }
    if (token !== resetToken.token) {
      throw new HttpException('Invalid token', 401)
    }
    const hashedPsw = await bcrypt.hash(password, 10)

    const updatedUser = await UserService.updateUser(user._doc._id, {
      ...user._doc,
      password: hashedPsw,
    })
    if (!updatedUser) throw new HttpException('User not found', 404)

    // delete old or expired reset codes
    await ResetTokenService.deleteInvalidResetToken(email)
  } catch (error) {
    throw new HttpException(error)
  }
}

function composeMagicLink(email: string, token: string) {
  const path = `auth/change-password?token=${token}&email=${email}`

  if (NODE_ENV === 'local') {
    return `http://localhost:3000/${path}`
  }
  return `${BASE_URL}/${path}`
}

export default {
  signTokenPayload,
  composeResetToken,
  validateResetToken,
  resetPassword,
  composeMagicLink,
}
