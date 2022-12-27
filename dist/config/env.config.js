"use strict";
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RESET_TOKEN_CRON_JOB_SCHEDULE = exports.GMAIL_EMAIL_USER = exports.GMAIL_API_REFRESH_TOKEN = exports.GMAIL_API_CLIENT_SECRET = exports.GMAIL_API_CLIENT_ID = exports.NODE_ENV = exports.ACCESS_TOKEN_SECRET = exports.SECRET_SESSION_KEY = exports.MONGO_URL = exports.PORT = exports.BASE_URL = void 0;
const tslib_1 = require("tslib");
const dotenv_1 = tslib_1.__importDefault(require("dotenv"));
dotenv_1.default.config();
_a = process.env, exports.BASE_URL = _a.BASE_URL, _b = _a.PORT, exports.PORT = _b === void 0 ? 9090 : _b, exports.MONGO_URL = _a.MONGO_URL, exports.SECRET_SESSION_KEY = _a.SECRET_SESSION_KEY, exports.ACCESS_TOKEN_SECRET = _a.ACCESS_TOKEN_SECRET, _c = _a.NODE_ENV, exports.NODE_ENV = _c === void 0 ? 'local' : _c, exports.GMAIL_API_CLIENT_ID = _a.GMAIL_API_CLIENT_ID, exports.GMAIL_API_CLIENT_SECRET = _a.GMAIL_API_CLIENT_SECRET, exports.GMAIL_API_REFRESH_TOKEN = _a.GMAIL_API_REFRESH_TOKEN, exports.GMAIL_EMAIL_USER = _a.GMAIL_EMAIL_USER, exports.RESET_TOKEN_CRON_JOB_SCHEDULE = _a.RESET_TOKEN_CRON_JOB_SCHEDULE;
//# sourceMappingURL=env.config.js.map