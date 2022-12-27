"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const mongoose_1 = tslib_1.__importStar(require("mongoose"));
const MessageSchema = new mongoose_1.default.Schema({
    senderId: {
        type: mongoose_1.default.Types.ObjectId,
        index: true,
    },
    receiverId: {
        type: mongoose_1.default.Types.ObjectId,
        index: true,
    },
    text: { type: String },
    media: { type: String },
    seen: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});
const ChatSchema = new mongoose_1.default.Schema({
    firstUserId: {
        type: mongoose_1.default.Types.ObjectId,
        index: true,
    },
    secondUserId: {
        type: mongoose_1.default.Types.ObjectId,
        index: true,
    },
    messages: [MessageSchema],
}, {
    timestamps: true,
    collection: 'chats',
});
const Chat = (0, mongoose_1.model)('Chat', ChatSchema);
exports.default = Chat;
//# sourceMappingURL=chat.model.js.map