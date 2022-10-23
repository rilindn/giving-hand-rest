import { Schema, Document, model } from 'mongoose'
import bcrypt from 'bcrypt'
import { IUser } from '@interfaces/user.interface'

const UserSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      index: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    gender: {
      type: String,
      required: true,
    },
    birthDate: {
      type: String,
    },
  },
  {
    timestamps: true,
    collection: 'users',
  },
)

UserSchema.pre('save', async function hashAndSave(next) {
  const hashedPsw = await bcrypt.hash(this.password, 10)
  this.password = hashedPsw
  next()
})

const userModel = model<IUser & Document>('User', UserSchema)

export default userModel
