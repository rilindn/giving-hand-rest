"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const jsonwebtoken_1 = tslib_1.__importDefault(require("jsonwebtoken"));
const lodash_1 = tslib_1.__importDefault(require("lodash"));
const crypto_1 = tslib_1.__importDefault(require("crypto"));
const bcrypt_1 = tslib_1.__importDefault(require("bcrypt"));
const user_model_1 = tslib_1.__importDefault(require("@models/user.model"));
const resetToken_model_1 = tslib_1.__importDefault(require("@models/resetToken.model"));
const HttpException_1 = tslib_1.__importDefault(require("@utils/HttpException"));
const user_service_1 = tslib_1.__importDefault(require("@services/user.service"));
const resetToken_service_1 = tslib_1.__importDefault(require("@services/resetToken.service"));
const env_config_1 = require("@/config/env.config");
function signTokenPayload(user) {
    const body = { userId: user._id };
    const token = jsonwebtoken_1.default.sign({ user: body }, env_config_1.ACCESS_TOKEN_SECRET || '', {});
    const data = lodash_1.default.omit(user, ['password']);
    return { token, user: data };
}
function composeResetToken(email) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield user_model_1.default.findOne({ email });
            if (!user)
                throw new HttpException_1.default('User not found', 404);
            // delete old or expired reset codes
            yield resetToken_service_1.default.deleteInvalidResetToken(email);
            const token = crypto_1.default.randomBytes(100).toString('hex');
            const salt = yield bcrypt_1.default.genSalt(10);
            const hashedToken = yield bcrypt_1.default.hash(token, salt);
            const resetToken = yield resetToken_service_1.default.newResetToken({
                userId: user._id,
                email,
                token: hashedToken,
            });
            yield resetToken.save();
            return { user, token };
        }
        catch (error) {
            throw new HttpException_1.default(error);
        }
    });
}
function validateResetToken(email, token) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield user_model_1.default.findOne({ email });
            if (!user)
                throw new HttpException_1.default('User not found', 404);
            const resetToken = yield resetToken_model_1.default.findOne({ email });
            if (!resetToken) {
                throw new HttpException_1.default('Invalid token', 401);
            }
            if (!(yield bcrypt_1.default.compare(token, resetToken.token))) {
                throw new HttpException_1.default('Invalid or expired token', 401);
            }
            return { user, resetToken };
        }
        catch (error) {
            throw new HttpException_1.default(error);
        }
    });
}
function resetPassword(token, password, email) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield user_model_1.default.findOne({ email });
            if (!user)
                throw new HttpException_1.default('User not found', 404);
            const resetToken = yield resetToken_model_1.default.findOne({ email });
            if (!resetToken) {
                throw new HttpException_1.default('Invalid or expired token', 401);
            }
            if (token !== resetToken.token) {
                throw new HttpException_1.default('Invalid token', 401);
            }
            const hashedPsw = yield bcrypt_1.default.hash(password, 10);
            const updatedUser = yield user_service_1.default.updateUser(user._doc._id, Object.assign(Object.assign({}, user._doc), { password: hashedPsw }));
            if (!updatedUser)
                throw new HttpException_1.default('User not found', 404);
            // delete old or expired reset codes
            yield resetToken_service_1.default.deleteInvalidResetToken(email);
        }
        catch (error) {
            throw new HttpException_1.default(error);
        }
    });
}
function composeMagicLink(email, token) {
    const path = `auth/change-password?token=${token}&email=${email}`;
    if (env_config_1.NODE_ENV === 'local') {
        return `http://localhost:3000/${path}`;
    }
    return `${env_config_1.BASE_URL}/${path}`;
}
exports.default = {
    signTokenPayload,
    composeResetToken,
    validateResetToken,
    resetPassword,
    composeMagicLink,
};
//# sourceMappingURL=auth.service.js.map