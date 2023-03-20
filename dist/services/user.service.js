"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const user_model_1 = tslib_1.__importDefault(require("../models/user.model"));
const HttpException_1 = tslib_1.__importDefault(require("../utils/HttpException"));
function getUsers() {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            const users = yield user_model_1.default.find();
            return users;
        }
        catch (error) {
            throw new HttpException_1.default(error);
        }
    });
}
function getUserById(id) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield user_model_1.default.findById(id);
            if (!user)
                throw new HttpException_1.default('User not found', 404);
            return user;
        }
        catch (error) {
            throw new HttpException_1.default(error);
        }
    });
}
function findUser(params) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield user_model_1.default.findOne(Object.assign({}, params));
            if (!user)
                throw new HttpException_1.default('User not found', 404);
            return user;
        }
        catch (error) {
            throw new HttpException_1.default(error);
        }
    });
}
function registerUser(payload) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            const user = new user_model_1.default(Object.assign({}, payload));
            yield user.save();
            return user;
        }
        catch (error) {
            throw new HttpException_1.default(error);
        }
    });
}
function updateUser(id, payload) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const userId = id.toString();
        try {
            const user = yield user_model_1.default.findByIdAndUpdate(userId, payload, {
                returnOriginal: false,
            });
            if (!user)
                throw new HttpException_1.default('User not found', 404);
            return user;
        }
        catch (error) {
            throw new HttpException_1.default(error);
        }
    });
}
function deleteUser(id) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield user_model_1.default.findByIdAndDelete(id);
            if (!user)
                throw new HttpException_1.default('User not found', 404);
            return user;
        }
        catch (error) {
            throw new HttpException_1.default(error);
        }
    });
}
exports.default = {
    getUsers,
    getUserById,
    findUser,
    updateUser,
    deleteUser,
    registerUser,
};
//# sourceMappingURL=user.service.js.map