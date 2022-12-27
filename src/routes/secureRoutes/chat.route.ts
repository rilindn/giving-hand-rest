import express from 'express'

import {
  createChatValidation,
  newMessageValidation,
} from '@validators/chat.validation'
import ChatController from '@controllers/chat.controller'

const ChatRouter = express.Router()

ChatRouter.get('/:id', ChatController.getMyChats)
ChatRouter.post('/', createChatValidation, ChatController.createChat)
ChatRouter.put('/read-messages', ChatController.readAllMessages)
ChatRouter.put(
  '/new-message/:id',
  newMessageValidation,
  ChatController.newMessage,
)
ChatRouter.delete(
  '/delete-message/:chatId/:messageId',
  ChatController.deleteMessage,
)

export default ChatRouter
