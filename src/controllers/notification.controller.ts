import { Request, Response, NextFunction } from 'express'

import {
  INotification,
  INotificationGetParams,
} from '@interfaces/notification.interface'
import NotificationService from '@services/notification.service'

async function getNotifications(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { id }: INotificationGetParams = req.params
  try {
    const products: INotification[] =
      await NotificationService.getNotifications(id)
    return res.send(products)
  } catch (error) {
    next(error)
  }
}

async function createProduct(req: Request, res: Response, next: NextFunction) {
  try {
    const notification: INotification = await NotificationService.createProduct(
      req.body,
    )
    return res.send(notification)
  } catch (error) {
    next(error)
  }
}

async function readAllNotifications(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { id }: { id?: string } = req.params
  try {
    const notifications = await NotificationService.readAllNotifications(id)
    return res.send(notifications)
  } catch (error) {
    next(error)
  }
}

export default {
  getNotifications,
  createProduct,
  readAllNotifications,
}
