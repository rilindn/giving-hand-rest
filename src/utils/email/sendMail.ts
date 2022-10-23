import hbs from 'nodemailer-express-handlebars'
import { IUser } from '@interfaces/user.interface'
import {
  GmailTransporter,
  MailOptions,
} from '@interfaces/mailTransporter.interface'
import { GMAIL_EMAIL_USER } from '@/config/env.config'
import createTransporter from './mailTransporter'

const constructTransporter: (
  user: IUser,
  magicLink: string,
) => Promise<GmailTransporter> = async (user, magicLink) => {
  const subject = 'Reset password'
  const transporter = await createTransporter()

  const options = {
    viewEngine: {
      extname: '.hbs',
      layoutsDir: 'src/utils/email/template/',
      defaultLayout: 'resetPassword',
      partialsDir: 'src/utils/email/template/',
    },
    viewPath: 'src/utils/email/template/',
    extName: '.hbs',
  }
  const mailOptions: MailOptions = {
    from: GMAIL_EMAIL_USER,
    to: user.email,
    subject,
    attachments: [
      {
        filename: 'logo.png',
        path: 'assets/logo.png',
        cid: 'logo',
      },
    ],
    template: 'resetPassword',
    context: {
      name: user.firstName,
      magicLink,
    },
  }
  transporter.use('compile', hbs(options))
  return { transporter, mailOptions }
}

export default constructTransporter
