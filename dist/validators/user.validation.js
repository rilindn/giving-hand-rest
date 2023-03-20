"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPasswordValidation = exports.updateUserValidation = exports.registerUserValidation = void 0;
const tslib_1 = require("tslib");
const joi_1 = tslib_1.__importDefault(require("joi"));
const validator_middleware_1 = tslib_1.__importDefault(require("../middleware/validator.middleware"));
const registerSchema = joi_1.default.object({
    firstName: joi_1.default.string().required().label('Firstname'),
    lastName: joi_1.default.string().required().label('Lastname'),
    email: joi_1.default.string().email().required().label('Email'),
    password: joi_1.default.string().min(8).required().label('Password'),
    gender: joi_1.default.string().required().label('Gender'),
    birthDate: joi_1.default.string().optional().allow(null).allow('').label('Birthdate'),
});
const updateSchema = joi_1.default.object({
    userId: joi_1.default.string().required().label('ID'),
    firstName: joi_1.default.string().min(2).max(30).label('Firstname'),
    lastName: joi_1.default.string().min(2).max(30).label('Lastname'),
    email: joi_1.default.string().email().min(5).max(30).label('Email'),
    gender: joi_1.default.string().required().label('Gender'),
    birthDate: joi_1.default.string().optional().allow(null).allow('').label('Birthdate'),
});
const resetPasswordSchema = joi_1.default.object({
    email: joi_1.default.string().email().min(5).max(30).label('Email'),
    resetToken: joi_1.default.string().required().label('Reset Token'),
    password: joi_1.default.string().alphanum().min(7).max(30).label('Password'),
});
const registerUserValidation = (req, res, next) => (0, validator_middleware_1.default)(registerSchema, req.body, next);
exports.registerUserValidation = registerUserValidation;
const updateUserValidation = (req, res, next) => (0, validator_middleware_1.default)(updateSchema, Object.assign(Object.assign({}, req.body), { userId: req.params.id }), next);
exports.updateUserValidation = updateUserValidation;
const resetPasswordValidation = (req, res, next) => (0, validator_middleware_1.default)(resetPasswordSchema, Object.assign({}, req.body), next);
exports.resetPasswordValidation = resetPasswordValidation;
exports.default = {
    registerUserValidation: exports.registerUserValidation,
    updateUserValidation: exports.updateUserValidation,
    resetPasswordValidation: exports.resetPasswordValidation,
};
//# sourceMappingURL=user.validation.js.map