"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const mongoose_1 = tslib_1.__importDefault(require("mongoose"));
const logger_1 = require("@utils/logger");
const http_errors_1 = tslib_1.__importDefault(require("http-errors"));
const env_config_1 = require("./env.config");
function initializeMongo() {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const mongoUrl = env_config_1.MONGO_URL;
        try {
            yield mongoose_1.default.connect(mongoUrl, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
            logger_1.logger.info(`Connected to mongo cluster: ${mongoose_1.default.connection.name}`);
            logger_1.logger.info('==================================');
        }
        catch (error) {
            (0, http_errors_1.default)(error.staus, error);
        }
    });
}
exports.default = initializeMongo;
//# sourceMappingURL=mongodb.config.js.map