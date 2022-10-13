import dotenv from 'dotenv'

dotenv.config()

export const {
  PORT = 9090,
  MONGO_URL,
  SECRET_SESSION_KEY,
  ACCESS_TOKEN_SECRET,
  NODE_ENV = 'development',
} = process.env
