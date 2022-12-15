import { Socket } from 'socket.io'
import { INotification } from '@interfaces/notification.interface'
import NotificationService from './notification.service'

async function notificationsHandler(socket: Socket) {
  socket.on('send-notification', async (data) => {
    const { userId } = data
    const notifications: INotification[] =
      await NotificationService.getNotifications(userId)
    socket.to(userId).emit('receive-notification', notifications)
  })
}

async function socketsService(socket: any) {
  notificationsHandler(socket)

  socket.on('join', (userId: string) => {
    socket.join(userId)
  })
}

export default socketsService
