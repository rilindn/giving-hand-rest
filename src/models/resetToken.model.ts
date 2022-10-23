import { Schema, Document, model } from 'mongoose'
import { IResetToken } from '@interfaces/resetToken.interface'

const ResetTokenSchema = new Schema(
  {
    userId: {
      type: String,
    },
    email: {
      type: String,
    },
    token: {
      type: String,
    },
    expiration: {
      type: Date,
      default: new Date(new Date().getTime() + 1 * 60 * 1000),
    },
  },
  {
    timestamps: true,
    collection: 'resetTokens',
  },
)

const ResetTokenModel = model<IResetToken & Document>(
  'ResetToken',
  ResetTokenSchema,
)

export default ResetTokenModel
