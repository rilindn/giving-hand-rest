import express from 'express'
import NotificationController from '../../controllers/notification.controller'

const NotificationRouter = express.Router()

NotificationRouter.get('/:id', NotificationController.getNotifications)
NotificationRouter.post(
  '/read-all/:id',
  NotificationController.readAllNotifications,
)

export default NotificationRouter
