"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const user_controller_1 = tslib_1.__importDefault(require("../../src/controllers/user.controller"));
const auth_controller_1 = tslib_1.__importDefault(require("../../src/controllers/auth.controller"));
const user_validation_1 = require("../../src/validators/user.validation");
const UserRouter = express_1.default.Router();
UserRouter.get('/loggedUser', auth_controller_1.default.loggedUser);
UserRouter.get('/', user_controller_1.default.getAllUsers);
UserRouter.get('/:id', user_controller_1.default.getUserById);
UserRouter.put('/:id', user_validation_1.updateUserValidation, user_controller_1.default.updateUser);
UserRouter.delete('/:id', user_controller_1.default.deleteUser);
exports.default = UserRouter;
//# sourceMappingURL=user.route.js.map