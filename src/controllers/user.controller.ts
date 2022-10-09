import { Request, Response, NextFunction } from 'express'
import { IUser } from '@interfaces/user.interface'
import UserService from '@services/user.service'

async function getAllUsers(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.query
    const users: IUser[] = await UserService.fetchUsers()
    return res.send(users)
  } catch (error) {
    next(error)
  }
}

async function registerUser(req: Request, res: Response, next: NextFunction) {
  try {
    const users: IUser[] = await UserService.registerUser(req.body)
    return res.send(users)
  } catch (error) {
    next(error)
  }
}

export default { getAllUsers, registerUser }
