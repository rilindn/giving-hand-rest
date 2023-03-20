import mongoose from 'mongoose'
import HttpException from '../utils/HttpException'
import Notification from '../models/notification.model'
import { INotificationPayload } from '../interfaces/notification.interface'

async function getNotifications(receiverId: string) {
  try {
    const notifications = await Notification.aggregate([
      {
        $match: { receiverId: new mongoose.Types.ObjectId(receiverId) },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'senderId',
          foreignField: '_id',
          as: 'sender',
        },
      },
      {
        $unwind: '$sender',
      },
      {
        $lookup: {
          from: 'products',
          localField: 'productId',
          foreignField: '_id',
          as: 'product',
        },
      },
      {
        $unwind: '$product',
      },
      {
        $project: {
          'sender.password': 0,
        },
      },
    ]).sort({ createdAt: 'descending' })
    return notifications
  } catch (error) {
    throw new HttpException(error)
  }
}

async function newNotification(payload: INotificationPayload) {
  try {
    const notification = new Notification({ ...payload })
    await notification.save()

    return notification
  } catch (error) {
    throw new HttpException(error)
  }
}

async function readAllNotifications(id: string) {
  const receiverId = id.toString()
  try {
    const notifications = await Notification.find({
      receiverId: new mongoose.Types.ObjectId(receiverId),
    }).update({ $set: { read: true } })

    return notifications
  } catch (error) {
    throw new HttpException(error)
  }
}

export default {
  getNotifications,
  newNotification,
  readAllNotifications,
}
