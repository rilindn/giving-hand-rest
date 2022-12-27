"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const cron_config_1 = tslib_1.__importDefault(require("./cron.config"));
const mongodb_config_1 = tslib_1.__importDefault(require("./mongodb.config"));
require("./passport.config");
(0, mongodb_config_1.default)();
(0, cron_config_1.default)();
//# sourceMappingURL=index.config.js.map