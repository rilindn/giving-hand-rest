import { NextFunction, Request, Response } from 'express'

import ChatService from '../services/chat.service'
import { IChat } from '../interfaces/chat.interface'

async function getMyChats(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params
  const { search } = req.query

  try {
    const chats: IChat[] = await ChatService.getMyChats({ id, search })

    return res.send(chats)
  } catch (error) {
    next(error)
  }
}

async function createChat(req: Request, res: Response, next: NextFunction) {
  try {
    const chat: IChat = await ChatService.createChat(req.body)

    return res.send(chat)
  } catch (error) {
    next(error)
  }
}

async function newMessage(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params

  try {
    const chat = await ChatService.newMessage(id, req.body)
    return res.send(chat)
  } catch (error) {
    next(error)
  }
}

async function readAllMessages(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { chatId, receiverId } = req.body

  try {
    const chat = await ChatService.readAllMessages(chatId, receiverId)
    return res.send(chat)
  } catch (error) {
    next(error)
  }
}

const deleteMessage = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { chatId, messageId } = req.params
  try {
    const chat = await ChatService.deleteMessage(chatId, messageId)

    return res.send(chat)
  } catch (error) {
    next(error)
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
  createChat,
  newMessage,
  readAllMessages,
  deleteMessage,
}
