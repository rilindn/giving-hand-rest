import { Socket } from 'socket.io'
import { INotification } from '@interfaces/notification.interface'
import { IChat } from '@interfaces/chat.interface'
import ChatService from '@services/chat.service'
import NotificationService from './notification.service'

async function notificationsHandler(socket: Socket) {
  socket.on('send-notification', async (data) => {
    const { userId } = data
    const notifications: INotification[] =
      await NotificationService.getNotifications(userId)
    socket.to(userId).emit('receive-notification', notifications)
  })
}

async function messagesHandler(socket: Socket) {
  socket.on('send-message', async (data) => {
    const { chatId, otherUserKeyField } = data
    const chat: IChat = await ChatService.getChatById(chatId, otherUserKeyField)
    socket.nsp.to(chatId).emit('receive-message', chat)
  })
}

async function socketsService(socket: Socket) {
  notificationsHandler(socket)
  messagesHandler(socket)

  socket.on('join', (userId: string) => {
    socket.join(userId)
  })

  socket.on('join-chat', (chatId: string) => {
    socket.join(chatId)
  })
}

export default socketsService
