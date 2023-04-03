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
//   console.log('first22', req.method)

//   if (req.method === 'OPTIONS') {
//     console.log('first', req.method)
//     const headers = {}
//     headers['Access-Control-Allow-Origin'] = '*'
//     headers['Access-Control-Allow-Methods'] = 'POST, GET, PUT, DELETE, OPTIONS'
//     headers['Access-Control-Allow-Credentials'] = false
//     headers['Access-Control-Max-Age'] = '86400' // 24 hours
//     headers['Access-Control-Allow-Headers'] =
//       'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept'
//     res.writeHead(200, headers)
//     res.end()
//   } else {
//     console.log('first', req.method)
//     res.header('Access-Control-Allow-Origin', '*')
//     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
//     res.header(
//       'Access-Control-Allow-Headers',
//       'Origin, X-Requested-With, Content-Type, Accept',
//     )
//     next()
//   }
// })

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
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  )
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'POST, PUT, PATCH, GET, DELETE')
    console.log('first2')
    return res.status(200).json({})
  }
  console.log('first passed')
  next()
})

// app.options('/*', (_, res) => {
//   res.header('Access-Control-Allow-Origin', 'https://givinghand.netlify.app')
//   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
//   res.header('Access-Control-Allow-Headers', 'Content-Type')
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
//   // origin: ['http://localhost:3000', 'https://givinghand.netlify.app'],
//   origin: '*',
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
// console.log('first')

// app.use(
//   cors({
//     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//     origin: 'http://localhost:3000',
//     optionsSuccessStatus: 200,
//     credentials: true,
//   }),
// )

// const corsOptions = {
//   origin: true,
//   credentials: true,
// }
// app.options('*', cors(corsOptions))

// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', 'http://localhost:3000') // update to match the domain you will make the request from
//   res.header(
//     'Access-Control-Allow-Headers',
//     'Origin, X-Requested-With, Content-Type, Accept',
//   )
//   next()
// })

app.use(cors())
// console.log('first')

// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', 'http://localhost:3000')
//   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
//   res.header('Access-Control-Allow-Headers', 'Content-Type')
//   next()
// })

// app.options('/*', (_, res) => {
//   console.log('res', res)
//   return res.sendStatus(200)
// })

// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*')
//   res.header('Access-Control-Allow-Headers', '*')
//   console.log('first', req)
//   console.log('res', res)
//   next()
// })

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
