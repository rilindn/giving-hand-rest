import { Transporter } from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
interface MailAtachments {
    filename: string;
    path: string;
    cid: string;
}
interface MailContext {
    name: string;
    magicLink: string;
}
export interface MailOptions {
    from: string;
    to: string;
    subject: string;
    attachments: MailAtachments[];
    template: string;
    context: MailContext;
}
export interface GmailTransporter {
    transporter: Transporter<SMTPTransport.SentMessageInfo>;
    mailOptions: MailOptions;
}
export {};
