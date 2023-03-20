"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const HttpException_1 = tslib_1.__importDefault(require("@utils/HttpException"));
const notification_model_1 = tslib_1.__importDefault(require("@models/notification.model"));
const mongoose_1 = tslib_1.__importDefault(require("mongoose"));
function getNotifications(receiverId) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            const notifications = yield notification_model_1.default.aggregate([
                {
                    $match: { receiverId: new mongoose_1.default.Types.ObjectId(receiverId) },
                },
                {
                    $lookup: {
                        from: 'users',
                        localField: 'senderId',
                        foreignField: '_id',
                        as: 'sender',
                    },
                },
                {
                    $unwind: '$sender',
                },
                {
                    $lookup: {
                        from: 'products',
                        localField: 'productId',
                        foreignField: '_id',
                        as: 'product',
                    },
                },
                {
                    $unwind: '$product',
                },
                {
                    $project: {
                        'sender.password': 0,
                    },
                },
            ]).sort({ createdAt: 'descending' });
            return notifications;
        }
        catch (error) {
            throw new HttpException_1.default(error);
        }
    });
}
function newNotification(payload) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            const notification = new notification_model_1.default(Object.assign({}, payload));
            yield notification.save();
            return notification;
        }
        catch (error) {
            throw new HttpException_1.default(error);
        }
    });
}
function readAllNotifications(id) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const receiverId = id.toString();
        try {
            const notifications = yield notification_model_1.default.find({
                receiverId: new mongoose_1.default.Types.ObjectId(receiverId),
            }).update({ $set: { read: true } });
            return notifications;
        }
        catch (error) {
            throw new HttpException_1.default(error);
        }
    });
}
exports.default = {
    getNotifications,
    newNotification,
    readAllNotifications,
};
//# sourceMappingURL=notification.service.js.map