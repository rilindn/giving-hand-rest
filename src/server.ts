import express, { Application } from 'express'
import cors from 'cors'
import morgan from 'morgan'
import createHttpError from 'http-errors'
import passport from 'passport'
import session from 'express-session'

import authRoutes from './routes/authRoutes'
import secureRoutes from './routes/secureRoutes'
import { logger, stream } from './utils/logger'
import errorHandler from './middleware/errorHandler.middleware'
import { SECRET_SESSION_KEY, PORT, NODE_ENV } from './config/env.config'

// initialize configs
import './config/index.config'

const app: Application = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())
app.use(morgan('dev', { stream }))

// passport
app.use(
  session({
    secret: SECRET_SESSION_KEY,
    resave: false,
    saveUninitialized: false,
  }),
)
app.use(passport.initialize())
app.use(passport.session())

// routes
app.use('/', authRoutes)
app.use('/', passport.authenticate('jwt', { session: false }), secureRoutes)

// error handling
app.use(() => createHttpError(404, 'Route not found'))
app.use(errorHandler)

app.listen(PORT, () => {
  logger.info('==================================')
  logger.info(`=========== ENV: ${NODE_ENV} ===========`)
  logger.info(` 🚀 App listening on the port ${PORT}  `)
  logger.info('==================================')
})

export default app
