import mongoose, { Document, model } from 'mongoose'

import { IChat } from '../interfaces/chat.interface'

const MessageSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Types.ObjectId,
      index: true,
    },
    receiverId: {
      type: mongoose.Types.ObjectId,
      index: true,
    },
    text: { type: String },
    media: { type: String },
    seen: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
)

const ChatSchema = new mongoose.Schema(
  {
    firstUserId: {
      type: mongoose.Types.ObjectId,
      index: true,
    },
    secondUserId: {
      type: mongoose.Types.ObjectId,
      index: true,
    },
    messages: [MessageSchema],
  },
  {
    timestamps: true,
    collection: 'chats',
  },
)

const Chat = model<IChat & Document>('Chat', ChatSchema)

export default Chat
