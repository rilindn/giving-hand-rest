"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const mongoose_1 = tslib_1.__importStar(require("mongoose"));
const NotificationSchema = new mongoose_1.Schema({
    type: {
        type: String,
    },
    senderId: {
        type: mongoose_1.default.Types.ObjectId,
        index: true,
    },
    receiverId: {
        type: mongoose_1.default.Types.ObjectId,
        index: true,
    },
    productId: {
        type: mongoose_1.default.Types.ObjectId,
        index: true,
    },
    read: {
        type: Boolean,
        index: true,
        default: false,
    },
}, {
    timestamps: true,
    collection: 'notifications',
});
const Notification = (0, mongoose_1.model)('Notification', NotificationSchema);
exports.default = Notification;
//# sourceMappingURL=notification.model.js.map