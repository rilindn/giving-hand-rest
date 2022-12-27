import nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
declare const createTransporter: () => Promise<nodemailer.Transporter<SMTPTransport.SentMessageInfo>>;
export default createTransporter;
