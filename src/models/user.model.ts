import { Schema, Document, model } from 'mongoose'
import { IUser } from '@interfaces/user.interface'

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    collection: 'users',
  },
)

const userModel = model<IUser & Document>('User', UserSchema)

export default userModel
