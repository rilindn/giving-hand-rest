import jsonwebtoken from 'jsonwebtoken'
import _ from 'lodash'
import { IUser } from '@interfaces/user.interface'
import User from '@models/user.model'
import { ACCESS_TOKEN_SECRET } from '../config/index.config'

function signTokenPayload(user: IUser) {
  const body = { userId: user._id }
  const token = jsonwebtoken.sign({ user: body }, ACCESS_TOKEN_SECRET || '', {
    expiresIn: '1d',
  })
  const data = _.omit(user, ['password']) // don't send password field in response

  return { token, user: data }
}

async function registerUser(payload: IUser) {
  const user = new User({ ...payload })
  try {
    await user.save()
    return user
  } catch (error) {
    return error
  }
}

export default { signTokenPayload, registerUser }
