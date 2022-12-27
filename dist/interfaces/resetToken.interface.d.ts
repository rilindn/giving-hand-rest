export interface IResetToken {
    _id: string;
    userId: string;
    email: string;
    token: string;
    expiration: Date;
}
export interface IResetTokenSearch {
    userId?: string;
    email?: string;
    token?: string;
    expiration?: Date;
}
export interface IResetPasswordPayload {
    password?: string;
    email?: string;
    token?: string;
}
export interface IResetTokenPayload {
    userId: string;
    email: string;
    token: string;
}
