"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ResetTokenSchema = new mongoose_1.Schema({
    userId: {
        type: String,
    },
    email: {
        type: String,
    },
    token: {
        type: String,
    },
    expiration: {
        type: Date,
        default: new Date(new Date().getTime() + 1 * 60 * 1000),
    },
}, {
    timestamps: true,
    collection: 'resetTokens',
});
const ResetTokenModel = (0, mongoose_1.model)('ResetToken', ResetTokenSchema);
exports.default = ResetTokenModel;
//# sourceMappingURL=resetToken.model.js.map