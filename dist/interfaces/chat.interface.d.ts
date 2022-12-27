import { IUser } from '../interfaces/user.interface'
export interface IMessage {
  [x: string]: any
  senderId: string
  receiverId: string
  text: string
  media?: string
  seen: boolean
}
export interface IMessagePayload {
  senderId: string
  receiverId: string
  text: string
  media?: string
  seen: boolean
}
export interface IChat {
  _id: string
  firstUserId: string
  secondUserId: string
  messages: IMessage[]
  otherUser: IUser
}
export interface IChatPayload {
  firstUserId: string
  secondUserId: string
}
