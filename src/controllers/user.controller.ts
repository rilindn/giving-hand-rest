import { Request, Response, NextFunction } from 'express'
import { IUser, IUserGetParams } from '@interfaces/user.interface'
import UserService from '@services/user.service'

async function getAllUsers(req: Request, res: Response, next: NextFunction) {
  try {
    const users: IUser[] = await UserService.getUsers()
    return res.send(users)
  } catch (error) {
    next(error)
  }
}

async function getUserById(req: Request, res: Response, next: NextFunction) {
  const { id }: IUserGetParams = req.query
  try {
    const user: IUser = await UserService.getUserById(id)
    return res.send(user)
  } catch (error) {
    next(error)
  }
}

async function updateUser(req: Request, res: Response, next: NextFunction) {
  const { id }: IUserGetParams = req.query
  try {
    const user: IUser = await UserService.updateUser(id, req.body)
    return res.send(user)
  } catch (error) {
    next(error)
  }
}

async function deleteUser(req: Request, res: Response, next: NextFunction) {
  const { id }: IUserGetParams = req.query
  try {
    const user: IUser = await UserService.deleteUser(id)
    return res.send(user)
  } catch (error) {
    next(error)
  }
}

export default {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
}
