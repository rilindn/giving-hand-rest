import { IUser } from '../../src/interfaces/user.interface';
import { GmailTransporter } from '../../src/interfaces/mailTransporter.interface';
declare const constructTransporter: (user: IUser, magicLink: string) => Promise<GmailTransporter>;
export default constructTransporter;
