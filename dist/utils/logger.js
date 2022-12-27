"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stream = exports.logger = void 0;
const tslib_1 = require("tslib");
const path_1 = require("path");
const winston_1 = tslib_1.__importDefault(require("winston"));
// logs dir
const logDir = (0, path_1.join)(__dirname, '../tmp/logs');
// if (!existsSync(logDir)) {
//   mkdirSync(logDir)
// }
// Define log format
const logFormat = winston_1.default.format.printf(({ timestamp, level, message }) => {
    let colorCode = '\x1b[94m';
    if (level === 'error')
        colorCode = '\x1b[31m';
    if (level === 'warning')
        colorCode = '\x1b[93m';
    return `[${timestamp}] ${colorCode} ${level.toUpperCase()}\x1b[0m : ${message}`;
});
/*
 * Log Level
 * error: 0, warn: 1, info: 2, http: 3, verbose: 4, debug: 5, silly: 6
 */
const logger = winston_1.default.createLogger({
    format: winston_1.default.format.combine(winston_1.default.format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss',
    }), logFormat),
    // transports: [
    //   // debug log setting
    //   new WinstonDaily({
    //     level: 'debug',
    //     datePattern: 'YYYY-MM-DD',
    //     dirname: `${logDir}/debug`, // log file /logs/debug/*.log in save
    //     filename: '%DATE%.log',
    //     maxFiles: 30, // 30 Days saved
    //     json: false,
    //     zippedArchive: true,
    //   }),
    //   // error log setting
    //   new WinstonDaily({
    //     level: 'error',
    //     datePattern: 'YYYY-MM-DD',
    //     dirname: `${logDir}/error`, // log file /logs/error/*.log in save
    //     filename: '%DATE%.log',
    //     maxFiles: 30, // 30 Days saved
    //     handleExceptions: true,
    //     json: false,
    //     zippedArchive: true,
    //   }),
    // ],
});
exports.logger = logger;
logger.add(new winston_1.default.transports.Console({
    format: winston_1.default.format.combine(winston_1.default.format.splat(), winston_1.default.format.colorize()),
}));
const stream = {
    write: (message) => {
        logger.info(message.substring(0, message.lastIndexOf('\n')));
    },
};
exports.stream = stream;
//# sourceMappingURL=logger.js.map