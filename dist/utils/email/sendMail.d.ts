import { IUser } from '@interfaces/user.interface';
import { GmailTransporter } from '@interfaces/mailTransporter.interface';
declare const constructTransporter: (user: IUser, magicLink: string) => Promise<GmailTransporter>;
export default constructTransporter;
