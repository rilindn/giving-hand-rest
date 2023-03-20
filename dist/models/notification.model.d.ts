import mongoose from 'mongoose';
import { INotification } from '../interfaces/notification.interface';
declare const Notification: mongoose.Model<INotification & mongoose.Document<any, any, any>, {}, {}, {}, any>;
export default Notification;
