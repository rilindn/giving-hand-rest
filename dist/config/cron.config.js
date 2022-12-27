"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const http_errors_1 = tslib_1.__importDefault(require("http-errors"));
const node_cron_1 = tslib_1.__importDefault(require("node-cron"));
const os_1 = tslib_1.__importDefault(require("os"));
const logger_1 = require("@/utils/logger");
const resetToken_service_1 = tslib_1.__importDefault(require("@/services/resetToken.service"));
const env_config_1 = require("./env.config");
function initializeCronJobs() {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const jobSchedule = env_config_1.RESET_TOKEN_CRON_JOB_SCHEDULE;
        try {
            node_cron_1.default.schedule(jobSchedule, () => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const heap = process.memoryUsage().heapUsed / 1024 / 1024;
                const freeMemory = `${Math.round((os_1.default.freemem() * 100) / os_1.default.totalmem())}%`;
                // heap used | free memory
                const csv = `${heap}, ${freeMemory}\n`;
                logger_1.logger.info(' Running invalid tokens delete job ');
                logger_1.logger.info(` OS Usage: ${csv}`);
                const { deletedCount } = yield resetToken_service_1.default.deleteInvalidResetToken();
                logger_1.logger.info(`======== Deleted ${deletedCount} tokens ========`);
            }));
        }
        catch (error) {
            (0, http_errors_1.default)(error.staus, error);
        }
    });
}
exports.default = initializeCronJobs;
//# sourceMappingURL=cron.config.js.map