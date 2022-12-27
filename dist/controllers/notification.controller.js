"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const notification_service_1 = tslib_1.__importDefault(require("../src/services/notification.service"));
function getNotifications(req, res, next) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        try {
            const products = yield notification_service_1.default.getNotifications(id);
            return res.send(products);
        }
        catch (error) {
            next(error);
        }
    });
}
function newNotification(req, res, next) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            const notification = yield notification_service_1.default.newNotification(req.body);
            return res.send(notification);
        }
        catch (error) {
            next(error);
        }
    });
}
function readAllNotifications(req, res, next) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        try {
            const notifications = yield notification_service_1.default.readAllNotifications(id);
            return res.send(notifications);
        }
        catch (error) {
            next(error);
        }
    });
}
exports.default = {
    getNotifications,
    newNotification,
    readAllNotifications,
};
//# sourceMappingURL=notification.controller.js.map