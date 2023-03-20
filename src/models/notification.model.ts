import mongoose, { Schema, Document, model } from 'mongoose'
import { INotification } from '../interfaces/notification.interface'

const NotificationSchema = new Schema(
  {
    type: {
      type: String,
    },
    senderId: {
      type: mongoose.Types.ObjectId,
      index: true,
    },
    receiverId: {
      type: mongoose.Types.ObjectId,
      index: true,
    },
    productId: {
      type: mongoose.Types.ObjectId,
      index: true,
    },
    read: {
      type: Boolean,
      index: true,
      default: false,
    },
  },
  {
    timestamps: true,
    collection: 'notifications',
  },
)

const Notification = model<INotification & Document>(
  'Notification',
  NotificationSchema,
)

export default Notification
