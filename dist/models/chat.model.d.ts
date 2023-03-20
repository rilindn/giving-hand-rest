import mongoose from 'mongoose';
import { IChat } from '../interfaces/chat.interface';
declare const Chat: mongoose.Model<IChat & mongoose.Document<any, any, any>, {}, {}, {}, any>;
export default Chat;
