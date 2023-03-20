import nodemailer from 'nodemailer'
import { google } from 'googleapis'
import SMTPTransport from 'nodemailer/lib/smtp-transport'
import {
  GMAIL_API_CLIENT_ID,
  GMAIL_API_CLIENT_SECRET,
  GMAIL_API_REFRESH_TOKEN,
  GMAIL_EMAIL_USER,
} from '../../config/env.config'

const { OAuth2 } = google.auth

const createTransporter = async () => {
  const oauth2Client = new OAuth2(
    GMAIL_API_CLIENT_ID,
    GMAIL_API_CLIENT_SECRET,
    'https://developers.google.com/oauthplayground',
  )

  oauth2Client.setCredentials({
    refresh_token: GMAIL_API_REFRESH_TOKEN,
  })

  const accessToken = await new Promise((resolve, reject) => {
    oauth2Client.getAccessToken((err, token: string) => {
      if (err) {
        console.error('err', err)
        reject()
      }
      resolve(token)
    })
  })

  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      type: 'OAuth2',
      user: GMAIL_EMAIL_USER,
      accessToken,
      clientId: GMAIL_API_CLIENT_ID,
      clientSecret: GMAIL_API_CLIENT_SECRET,
      refreshToken: GMAIL_API_REFRESH_TOKEN,
    },
  } as SMTPTransport.Options)

  return transporter
}

export default createTransporter
