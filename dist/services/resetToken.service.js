"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const resetToken_model_1 = tslib_1.__importDefault(require("../src/models/resetToken.model"));
const HttpException_1 = tslib_1.__importDefault(require("../src/utils/HttpException"));
function findToken(params) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            const token = yield resetToken_model_1.default.findOne(Object.assign({}, params));
            return token;
        }
        catch (error) {
            throw new HttpException_1.default(error);
        }
    });
}
function deleteInvalidResetToken(email) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            const tokens = yield resetToken_model_1.default.deleteMany({
                $or: [
                    { expiration: { $lt: new Date(Date.now() - 10 * 60 * 1000) } },
                    { email },
                ],
            });
            return tokens;
        }
        catch (error) {
            throw new HttpException_1.default(error);
        }
    });
}
function newResetToken(payload) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const resetToken = new resetToken_model_1.default(Object.assign({}, payload));
        try {
            yield resetToken.save();
            return resetToken;
        }
        catch (error) {
            throw new HttpException_1.default(error);
        }
    });
}
exports.default = {
    findToken,
    deleteInvalidResetToken,
    newResetToken,
};
//# sourceMappingURL=resetToken.service.js.map