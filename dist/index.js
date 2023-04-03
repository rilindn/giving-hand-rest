"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const cors_1 = tslib_1.__importDefault(require("cors"));
const morgan_1 = tslib_1.__importDefault(require("morgan"));
const http_errors_1 = tslib_1.__importDefault(require("http-errors"));
const passport_1 = tslib_1.__importDefault(require("passport"));
const express_session_1 = tslib_1.__importDefault(require("express-session"));
const socket_io_1 = require("socket.io");
const authRoutes_1 = tslib_1.__importDefault(require("./routes/authRoutes"));
const secureRoutes_1 = tslib_1.__importDefault(require("./routes/secureRoutes"));
const logger_1 = require("./utils/logger");
const errorHandler_middleware_1 = tslib_1.__importDefault(require("./middleware/errorHandler.middleware"));
const sockets_service_1 = tslib_1.__importDefault(require("./services/sockets.service"));
const env_config_1 = require("./config/env.config");
// initialize configs
require("./config/index.config");
const app = (0, express_1.default)();
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
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'POST, PUT, PATCH, GET, DELETE');
        console.log('first2');
        return res.status(200).json({});
    }
    console.log('first passed');
    next();
});
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
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
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
app.use((0, cors_1.default)());
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
app.use((0, morgan_1.default)('dev', { stream: logger_1.stream }));
// passport
app.use((0, express_session_1.default)({
    secret: env_config_1.SECRET_SESSION_KEY,
    resave: false,
    saveUninitialized: false,
}));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
// routes
app.use('/', authRoutes_1.default);
app.use('/', passport_1.default.authenticate('jwt', { session: false }), secureRoutes_1.default);
// error handling
app.use(() => (0, http_errors_1.default)(404, 'Route not found'));
app.use(errorHandler_middleware_1.default);
const server = app.listen(env_config_1.PORT, () => {
    logger_1.logger.info('==================================');
    logger_1.logger.info(`=========== ENV: ${env_config_1.NODE_ENV} ===========`);
    logger_1.logger.info(` 🚀 App listening on the port ${env_config_1.PORT}  `);
    logger_1.logger.info('==================================');
});
const io = new socket_io_1.Server(server, {
    cors: {
        origin: '*',
    },
});
io.on('connection', sockets_service_1.default);
exports.default = app;
//# sourceMappingURL=index.js.map