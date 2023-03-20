import { IUser } from './user.interface';
export interface INotification {
    _id: string;
    type: string;
    read: boolean;
    senderId: string;
    receiverId: string;
    sender?: IUser;
}
export interface INotificationPayload {
    type: 'product_requested' | 'product_request_accepted' | 'product_request_rejected';
    read?: boolean;
    senderId: string;
    receiverId: string;
    productId: string;
}
export interface INotificationGetParams {
    id?: string;
}
