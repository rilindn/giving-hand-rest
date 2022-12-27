"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const user_service_1 = tslib_1.__importDefault(require("../src/services/user.service"));
function getAllUsers(req, res, next) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            const users = yield user_service_1.default.getUsers();
            return res.send(users);
        }
        catch (error) {
            next(error);
        }
    });
}
function getUserById(req, res, next) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        try {
            const user = yield user_service_1.default.getUserById(id);
            return res.send(user);
        }
        catch (error) {
            next(error);
        }
    });
}
function updateUser(req, res, next) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        try {
            const user = yield user_service_1.default.updateUser(id, req.body);
            return res.send(user);
        }
        catch (error) {
            next(error);
        }
    });
}
function deleteUser(req, res, next) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        try {
            const user = yield user_service_1.default.deleteUser(id);
            return res.send(user);
        }
        catch (error) {
            next(error);
        }
    });
}
exports.default = {
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
};
//# sourceMappingURL=user.controller.js.map