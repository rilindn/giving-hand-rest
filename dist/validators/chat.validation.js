"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newMessageValidation = exports.createChatValidation = void 0;
const tslib_1 = require("tslib");
const joi_1 = tslib_1.__importDefault(require("joi"));
const validator_middleware_1 = tslib_1.__importDefault(require("@middleware/validator.middleware"));
const registerSchema = joi_1.default.object({
    firstUserId: joi_1.default.string().required().label('First user ID'),
    secondUserId: joi_1.default.string().required().label('Second user ID'),
});
const newMessageSchema = joi_1.default.object({
    senderId: joi_1.default.string().required().label('Sender ID'),
    receiverId: joi_1.default.string().required().label('Receiver ID'),
    text: joi_1.default.string().allow(null, '').label('Message text'),
    media: joi_1.default.string().allow(null, '').label('Media'),
}).or('text', 'media');
const createChatValidation = (req, res, next) => (0, validator_middleware_1.default)(registerSchema, req.body, next);
exports.createChatValidation = createChatValidation;
const newMessageValidation = (req, res, next) => (0, validator_middleware_1.default)(newMessageSchema, req.body, next);
exports.newMessageValidation = newMessageValidation;
exports.default = {
    createChatValidation: exports.createChatValidation,
    newMessageValidation: exports.newMessageValidation,
};
//# sourceMappingURL=chat.validation.js.map