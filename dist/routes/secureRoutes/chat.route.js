"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const chat_validation_1 = require("../../src/validators/chat.validation");
const chat_controller_1 = tslib_1.__importDefault(require("../../src/controllers/chat.controller"));
const ChatRouter = express_1.default.Router();
ChatRouter.get('/:id', chat_controller_1.default.getMyChats);
ChatRouter.post('/', chat_validation_1.createChatValidation, chat_controller_1.default.createChat);
ChatRouter.put('/read-messages', chat_controller_1.default.readAllMessages);
ChatRouter.put('/new-message/:id', chat_validation_1.newMessageValidation, chat_controller_1.default.newMessage);
ChatRouter.delete('/delete-message/:chatId/:messageId', chat_controller_1.default.deleteMessage);
exports.default = ChatRouter;
//# sourceMappingURL=chat.route.js.map