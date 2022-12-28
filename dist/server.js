'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
const tslib_1 = require('tslib')
const express_1 = tslib_1.__importDefault(require('express'))
const cors_1 = tslib_1.__importDefault(require('cors'))
const http_errors_1 = tslib_1.__importDefault(require('http-errors'))
const passport_1 = tslib_1.__importDefault(require('passport'))
const express_session_1 = tslib_1.__importDefault(require('express-session'))
const socket_io_1 = require('socket.io')
const authRoutes_1 = tslib_1.__importDefault(require('./routes/authRoutes'))
const secureRoutes_1 = tslib_1.__importDefault(require('./routes/secureRoutes'))
const logger_1 = require('./utils/logger')
const errorHandler_middleware_1 = tslib_1.__importDefault(
  require('./middleware/errorHandler.middleware'),
)
const sockets_service_1 = tslib_1.__importDefault(
  require('./services/sockets.service'),
)
const env_config_1 = require('./config/env.config')
// initialize configs
require('./config/index.config')
const app = (0, express_1.default)()
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*')
//   next()
// })
app.use(express_1.default.urlencoded({ extended: true }))
app.use(express_1.default.json())
// const corsOptions = {
//     origin: '*',
//     credentials: true,
//     optionSuccessStatus: 200,
// };
// app.use((0, cors_1.default)(corsOptions));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  )
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'POST, PUT, PATCH, GET, DELETE')
    return res.status(200).json({})
  }
  next()
})

// app.use(morgan('dev', { stream }))
// passport
app.use(
  (0, express_session_1.default)({
    secret: env_config_1.SECRET_SESSION_KEY,
    resave: false,
    saveUninitialized: false,
  }),
)
app.use(passport_1.default.initialize())
app.use(passport_1.default.session())
// routes
app.use('/', authRoutes_1.default)
app.use(
  '/',
  passport_1.default.authenticate('jwt', { session: false }),
  secureRoutes_1.default,
)
// error handling
app.use(() => (0, http_errors_1.default)(404, 'Route not found'))
app.use(errorHandler_middleware_1.default)
const server = app.listen(env_config_1.PORT, () => {
  logger_1.logger.info('==================================')
  logger_1.logger.info(`=========== ENV: ${env_config_1.NODE_ENV} ===========`)
  logger_1.logger.info(` 🚀 App listening on the port ${env_config_1.PORT}  `)
  logger_1.logger.info('==================================')
})
const io = new socket_io_1.Server(server, {
  cors: {
    origin: '*',
  },
})
io.on('connection', sockets_service_1.default)
exports.default = app
//# sourceMappingURL=server.js.map
