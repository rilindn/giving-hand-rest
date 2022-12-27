'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
const tslib_1 = require('tslib')
const chat_service_1 = tslib_1.__importDefault(
  require('../services/chat.service'),
)
function getMyChats(req, res, next) {
  return tslib_1.__awaiter(this, void 0, void 0, function* () {
    const { id } = req.params
    const { search } = req.query
    try {
      const chats = yield chat_service_1.default.getMyChats({ id, search })
      return res.send(chats)
    } catch (error) {
      next(error)
    }
  })
}
function createChat(req, res, next) {
  return tslib_1.__awaiter(this, void 0, void 0, function* () {
    try {
      const chat = yield chat_service_1.default.createChat(req.body)
      return res.send(chat)
    } catch (error) {
      next(error)
    }
  })
}
function newMessage(req, res, next) {
  return tslib_1.__awaiter(this, void 0, void 0, function* () {
    const { id } = req.params
    try {
      const chat = yield chat_service_1.default.newMessage(id, req.body)
      return res.send(chat)
    } catch (error) {
      next(error)
    }
  })
}
function readAllMessages(req, res, next) {
  return tslib_1.__awaiter(this, void 0, void 0, function* () {
    const { chatId, receiverId } = req.body
    try {
      const chat = yield chat_service_1.default.readAllMessages(
        chatId,
        receiverId,
      )
      return res.send(chat)
    } catch (error) {
      next(error)
    }
  })
}
const deleteMessage = (req, res, next) =>
  tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const { chatId, messageId } = req.params
    try {
      const chat = yield chat_service_1.default.deleteMessage(chatId, messageId)
      return res.send(chat)
    } catch (error) {
      next(error)
    }
  })
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
exports.default = {
  getMyChats,
  createChat,
  newMessage,
  readAllMessages,
  deleteMessage,
}
//# sourceMappingURL=chat.controller.js.map
