"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const mongoose_1 = require("mongoose");
const bcrypt_1 = tslib_1.__importDefault(require("bcrypt"));
const UserSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        index: true,
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    gender: {
        type: String,
        required: true,
    },
    birthDate: {
        type: String,
    },
}, {
    timestamps: true,
    collection: 'users',
});
UserSchema.pre('save', function hashAndSave(next) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const hashedPsw = yield bcrypt_1.default.hash(this.password, 10);
        this.password = hashedPsw;
        next();
    });
});
const userModel = (0, mongoose_1.model)('User', UserSchema);
exports.default = userModel;
//# sourceMappingURL=user.model.js.map