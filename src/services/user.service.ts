import User from '../models/user.model'
import { IUser, IUserRegister, IUserSearch } from '../interfaces/user.interface'
import HttpException from '../utils/HttpException'

async function getUsers() {
  try {
    const users = await User.find()
    return users
  } catch (error) {
    throw new HttpException(error)
  }
}

async function getUserById(id: string) {
  try {
    const user = await User.findById(id)
    if (!user) throw new HttpException('User not found', 404)
    return user
  } catch (error) {
    throw new HttpException(error)
  }
}

async function findUser(params: IUserSearch) {
  try {
    const user = await User.findOne({ ...params })
    if (!user) throw new HttpException('User not found', 404)

    return user
  } catch (error) {
    throw new HttpException(error)
  }
}

async function registerUser(payload: IUserRegister) {
  try {
    const user = new User({ ...payload })
    await user.save()

    return user
  } catch (error) {
    throw new HttpException(error)
  }
}

async function updateUser(id: string, payload: IUser) {
  const userId = id.toString()
  try {
    const user = await User.findByIdAndUpdate(userId, payload, {
      returnOriginal: false,
    })
    if (!user) throw new HttpException('User not found', 404)
    return user
  } catch (error) {
    throw new HttpException(error)
  }
}

async function deleteUser(id: string) {
  try {
    const user = await User.findByIdAndDelete(id)
    if (!user) throw new HttpException('User not found', 404)
    return user
  } catch (error) {
    throw new HttpException(error)
  }
}

export default {
  getUsers,
  getUserById,
  findUser,
  updateUser,
  deleteUser,
  registerUser,
}
