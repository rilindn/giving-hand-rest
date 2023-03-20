import _ from 'lodash';
import { IUser } from '../interfaces/user.interface';
import { IResetToken } from '../interfaces/resetToken.interface';
declare function signTokenPayload(user: IUser): {
    token: string;
    user: _.Omit<IUser, "password">;
};
declare function composeResetToken(email: string): Promise<{
    user: IUser;
    token: string;
}>;
declare function validateResetToken(email: string, token: string): Promise<{
    user: IUser;
    resetToken: IResetToken;
}>;
declare function resetPassword(token: string, password: string, email: string): Promise<void>;
declare function composeMagicLink(email: string, token: string): string;
declare const _default: {
    signTokenPayload: typeof signTokenPayload;
    composeResetToken: typeof composeResetToken;
    validateResetToken: typeof validateResetToken;
    resetPassword: typeof resetPassword;
    composeMagicLink: typeof composeMagicLink;
};
export default _default;
