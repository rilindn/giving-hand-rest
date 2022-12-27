import { Request, Response, NextFunction } from 'express'
import { AuthRequest } from '../@types/index'
declare function login(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void>
declare function registerUser(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response<any, Record<string, any>>>
declare function loggedUser(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): Promise<Response<any, Record<string, any>>>
declare function requestResetPassword(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void>
declare function validateResetToken(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response<any, Record<string, any>>>
declare function resetPassword(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response<any, Record<string, any>>>
declare function deleteToken(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response<any, Record<string, any>>>
declare const _default: {
  login: typeof login
  registerUser: typeof registerUser
  loggedUser: typeof loggedUser
  requestResetPassword: typeof requestResetPassword
  validateResetToken: typeof validateResetToken
  resetPassword: typeof resetPassword
  deleteToken: typeof deleteToken
}
export default _default
