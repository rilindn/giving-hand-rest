import {
  IResetTokenPayload,
  IResetTokenSearch,
} from '../interfaces/resetToken.interface'
import ResetTokenModel from '../models/resetToken.model'
import HttpException from '../utils/HttpException'

async function findToken(params: IResetTokenSearch) {
  try {
    const token = await ResetTokenModel.findOne({ ...params })
    return token
  } catch (error) {
    throw new HttpException(error)
  }
}

async function deleteInvalidResetToken(email?: string) {
  try {
    const tokens = await ResetTokenModel.deleteMany({
      $or: [
        { expiration: { $lt: new Date(Date.now() - 10 * 60 * 1000) } },
        { email },
      ],
    })
    return tokens
  } catch (error) {
    throw new HttpException(error)
  }
}

async function newResetToken(payload: IResetTokenPayload) {
  const resetToken = new ResetTokenModel({ ...payload })
  try {
    await resetToken.save()
    return resetToken
  } catch (error) {
    throw new HttpException(error)
  }
}

export default {
  findToken,
  deleteInvalidResetToken,
  newResetToken,
}
