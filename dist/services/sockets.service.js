"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const chat_service_1 = tslib_1.__importDefault(require("./chat.service"));
const notification_service_1 = tslib_1.__importDefault(require("./notification.service"));
function notificationsHandler(socket) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        socket.on('send-notification', (data) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { userId } = data;
            const notifications = yield notification_service_1.default.getNotifications(userId);
            socket.to(userId).emit('receive-notification', notifications);
        }));
    });
}
function messagesHandler(socket) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        socket.on('send-message', (data) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const { chatId, otherUserKeyField } = data;
            const chat = yield chat_service_1.default.getChatById(chatId, otherUserKeyField);
            socket.nsp.to(chatId).emit('receive-message', chat);
        }));
    });
}
function socketsService(socket) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        notificationsHandler(socket);
        messagesHandler(socket);
        socket.on('join', (userId) => {
            socket.join(userId);
        });
        socket.on('join-chat', (chatId) => {
            socket.join(chatId);
        });
    });
}
exports.default = socketsService;
//# sourceMappingURL=sockets.service.js.map