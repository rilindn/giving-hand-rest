import mongoose from 'mongoose'
import _ from 'lodash'

import HttpException from '../utils/HttpException'
import {
  IChat,
  IChatPayload,
  IMessage,
  IMessagePayload,
} from '../interfaces/chat.interface'
import Chat from '../models/chat.model'

const getMyChats = async ({ id, search }) => {
  try {
    const chats: IChat[] = await Chat.find({
      $or: [
        { firstUserId: new mongoose.Types.ObjectId(id) },
        { secondUserId: new mongoose.Types.ObjectId(id) },
      ],
    })

    const chatsResolved: IChat[] = await Promise.all(
      chats.map(async (chat) => {
        const otherUserKeyField =
          chat.firstUserId.toString() === id ? 'secondUserId' : 'firstUserId'

        const chatResolved = await Chat.aggregate([
          {
            $match: { _id: new mongoose.Types.ObjectId(chat._id) },
          },
          {
            $lookup: {
              from: 'users',
              localField: otherUserKeyField,
              foreignField: '_id',
              as: 'otherUser',
            },
          },
          {
            $unwind: '$otherUser',
          },
          {
            $project: {
              'otherUser.password': 0,
            },
          },
          {
            $match: {
              ...(search && {
                $or: [
                  {
                    'otherUser.firstName': {
                      $regex: search,
                      $options: 'i',
                    },
                  },
                  {
                    'otherUser.lastName': {
                      $regex: search,
                      $options: 'i',
                    },
                  },
                ],
              }),
            },
          },
        ])
        return chatResolved[0]
      }),
    )

    if (!chatsResolved.length) throw new HttpException('No chats found!')
    return _.chain(chatsResolved).flatMapDeep().filter(Boolean).value()
  } catch (error) {
    throw new HttpException(error)
  }
}

const getChatById = async (id: string, otherUserKeyField: string) => {
  try {
    const chat: IChat[] = await Chat.aggregate([
      {
        $match: { _id: new mongoose.Types.ObjectId(id) },
      },
      {
        $lookup: {
          from: 'users',
          localField: otherUserKeyField,
          foreignField: '_id',
          as: 'otherUser',
        },
      },
      {
        $unwind: '$otherUser',
      },
      {
        $project: {
          'otherUser.password': 0,
        },
      },
    ])

    if (!chat) throw new HttpException('No chat found!')
    return chat[0]
  } catch (error) {
    throw new HttpException(error)
  }
}

const createChat = async ({ firstUserId, secondUserId }: IChatPayload) => {
  const firstUser = new mongoose.Types.ObjectId(firstUserId)
  const secondUser = new mongoose.Types.ObjectId(secondUserId)

  try {
    const existingChat = await Chat.findOne({
      firstUserId: { $in: [firstUser, secondUser] },
      secondUserId: { $in: [secondUser, firstUser] },
    })

    if (existingChat) return existingChat

    const chat = new Chat({ firstUserId: firstUser, secondUserId: secondUser })
    await chat.save()

    return chat
  } catch (error) {
    throw new HttpException(error)
  }
}

const newMessage = async (id: string, payload: IMessagePayload) => {
  try {
    const chat = await Chat.findById(id)
    if (!chat) throw new HttpException('Chat not found!', 404)

    chat.messages.push(payload)
    await chat.save()

    return chat
  } catch (error) {
    throw new HttpException(error)
  }
}

async function readAllMessages(chatId: string, receiverId: string) {
  try {
    const chat = await Chat.findById(chatId)

    chat.messages = chat.messages.map((message) => {
      if (message.receiverId.toString() !== receiverId) return message

      return {
        ...message,
        seen: true,
      }
    })
    await chat.save()
    return chat
  } catch (error) {
    throw new HttpException(error)
  }
}

const deleteMessage = async (chatId: string, messageId: string) => {
  try {
    const chat = await Chat.findById(chatId)
    if (!chat) throw new HttpException('Chat not found!', 404)

    chat.messages = chat.messages.filter(
      (message: IMessage) => message?._id.toString() !== messageId,
    )
    await chat.save()

    return chat
  } catch (error) {
    throw new HttpException(error)
  }
}

// const deleteChat = async (req: Request, res: Response) => {
//   const { id } = req.params
//   try {
//     const deletedChat = await Chat.findByIdAndDelete(id)
//     if (!deletedChat) return res.status(404).send('Chat not found!')
//     res.status(200).send(deletedChat)
//   } catch (error) {
//     return res.status(500).send(error)
//   }
// }

export default {
  getMyChats,
  getChatById,
  createChat,
  newMessage,
  readAllMessages,
  deleteMessage,
}
