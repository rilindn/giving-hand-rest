"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("@utils/logger");
const errorHandler = (error, req, res, next) => {
    try {
        const status = error.status || 500;
        const message = error.message || 'Something went wrong';
        logger_1.logger.error(`[${req.method}] ${req.path} >> StatusCode:: ${status}, Message:: ${message}`);
        res.status(status).json({ message });
    }
    catch (err) {
        next(err);
    }
};
exports.default = errorHandler;
//# sourceMappingURL=errorHandler.middleware.js.map