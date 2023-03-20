import mongoose from 'mongoose';
import { IChat, IChatPayload, IMessagePayload } from '@interfaces/chat.interface';
declare function readAllMessages(chatId: string, receiverId: string): Promise<IChat & mongoose.Document<any, any, any> & {
    _id: mongoose.Types.ObjectId;
}>;
declare const _default: {
    getMyChats: ({ id, search }: {
        id: any;
        search: any;
    }) => Promise<IChat[]>;
    getChatById: (id: string, otherUserKeyField: string) => Promise<IChat>;
    createChat: ({ firstUserId, secondUserId }: IChatPayload) => Promise<IChat & mongoose.Document<any, any, any> & {
        _id: mongoose.Types.ObjectId;
    }>;
    newMessage: (id: string, payload: IMessagePayload) => Promise<IChat & mongoose.Document<any, any, any> & {
        _id: mongoose.Types.ObjectId;
    }>;
    readAllMessages: typeof readAllMessages;
    deleteMessage: (chatId: string, messageId: string) => Promise<IChat & mongoose.Document<any, any, any> & {
        _id: mongoose.Types.ObjectId;
    }>;
};
export default _default;
