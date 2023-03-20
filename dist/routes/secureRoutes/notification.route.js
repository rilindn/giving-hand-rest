"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const notification_controller_1 = tslib_1.__importDefault(require("@controllers/notification.controller"));
const NotificationRouter = express_1.default.Router();
NotificationRouter.get('/:id', notification_controller_1.default.getNotifications);
NotificationRouter.post('/read-all/:id', notification_controller_1.default.readAllNotifications);
exports.default = NotificationRouter;
//# sourceMappingURL=notification.route.js.map