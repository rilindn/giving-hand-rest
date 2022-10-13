import User from '@models/user.model'
import { IUser } from '@interfaces/user.interface'

async function getUsers() {
  try {
    const users = await User.find()
    return users
  } catch (error) {
    return error
  }
}

async function getUserById(id: string) {
  try {
    const user = await User.findById(id)
    return user
  } catch (error) {
    return error
  }
}

async function updateUser(id: string, payload: IUser) {
  try {
    const user = await User.findByIdAndUpdate(id, payload, {
      returnOriginal: false,
    })
    if (!user) throw new Error('User not found')
    return user
  } catch (error) {
    return error
  }
}

async function deleteUser(id: string) {
  try {
    const user = await User.findByIdAndDelete(id)
    if (!user) throw new Error('User not found')
    return user
  } catch (error) {
    return error
  }
}

export default {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
}
