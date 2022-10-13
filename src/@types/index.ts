import { Request } from 'express'

export interface HttpException {
  status: number
  message: string
}

export interface AuthRequest extends Request {
  user: {
    userId: string
  }
}
