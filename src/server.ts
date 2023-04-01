import express, { Application } from 'express'
import cors from 'cors'
import morgan from 'morgan'
import createHttpError from 'http-errors'
import passport from 'passport'
import session from 'express-session'
import { Server } from 'socket.io'

import authRoutes from './routes/authRoutes'
import secureRoutes from './routes/secureRoutes'
import { logger, stream } from './utils/logger'
import errorHandler from './middleware/errorHandler.middleware'
import socketsService from './services/sockets.service'
import { SECRET_SESSION_KEY, PORT, NODE_ENV } from './config/env.config'

// initialize configs
import './config/index.config'

const app: Application = express()

// app.use((req, res, next) => {
//   res.set('Access-Control-Allow-Origin', 'http://localhost:3000')
//   res.set('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT')
//   res.set(
//     'Access-Control-Allow-Headers',
//     'Origin, X-Requested-With, Content-Type, Accept, Authorization',
//   )
//   next()
//   // console.log('first', res)
// })
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*')
//   res.header(
//     'Access-Control-Allow-Headers',
//     'Origin, X-Requested-With, Content-Type, Accept, Authorization',
//   )
//   if (req.method === 'OPTIONS') {
//     res.header('Access-Control-Allow-Methods', 'POST, PUT, PATCH, GET, DELETE')
//     return res.status(200).json({})
//   }
//   next()
// })

// =========
// const whitelist = ['http://localhost:3000', 'http://example2.com']

// // ✅ Enable pre-flight requests
// app.options('*', cors())

// const corsOptions = {
//   origin: (origin, callback) => {
//     if (whitelist.indexOf(origin) !== -1 || !origin) {
//       callback(null, true)
//     } else {
//       callback(new Error('Not allowed by CORS'))
//     }
//   },
// }

// app.use(cors(corsOptions))

app.use(express.urlencoded({ extended: true }))

app.use(express.json())
// const corsOptions = {
//   origin: 'http://localhost:3000',
//   credentials: true, // access-control-allow-credentials:true
//   optionSuccessStatus: 200,
// }
// app.use(cors(corsOptions))
// const whitelist = ['http://localhost:3000']
// const corsOptions = {
//   origin(origin, callback) {
//     if (!origin || whitelist.indexOf(origin) !== -1) {
//       callback(null, true)
//     } else {
//       callback(new Error('Not allowed by CORS'))
//     }
//   },
//   credentials: true,
// }
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

const server = app.listen(PORT, () => {
  logger.info('==================================')
  logger.info(`=========== ENV: ${NODE_ENV} ===========`)
  logger.info(` 🚀 App listening on the port ${PORT}  `)
  logger.info('==================================')
})

const io = new Server(server, {
  cors: {
    origin: '*',
  },
})

io.on('connection', socketsService)

export default app
