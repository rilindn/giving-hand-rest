import { INotificationPayload } from '@interfaces/notification.interface';
import mongoose from 'mongoose';
declare function getNotifications(receiverId: string): Promise<any[]>;
declare function newNotification(payload: INotificationPayload): Promise<import("@interfaces/notification.interface").INotification & mongoose.Document<any, any, any> & {
    _id: mongoose.Types.ObjectId;
}>;
declare function readAllNotifications(id: string): Promise<import("mongodb").UpdateResult>;
declare const _default: {
    getNotifications: typeof getNotifications;
    newNotification: typeof newNotification;
    readAllNotifications: typeof readAllNotifications;
};
export default _default;
