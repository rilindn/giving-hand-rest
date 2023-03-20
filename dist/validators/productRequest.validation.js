"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProductRequestValidation = exports.createProductRequestValidation = void 0;
const tslib_1 = require("tslib");
const joi_1 = tslib_1.__importDefault(require("joi"));
const validator_middleware_1 = tslib_1.__importDefault(require("../middleware/validator.middleware"));
const registerSchema = joi_1.default.object({
    description: joi_1.default.string().required().label('Description'),
    userId: joi_1.default.string().required().label('User ID'),
    status: joi_1.default.string().label('Status'),
    productId: joi_1.default.string().required().label('Product ID'),
});
const updateSchema = joi_1.default.object({
    productRequestId: joi_1.default.string().required().label('Product Request ID'),
    description: joi_1.default.string().label('Description'),
    status: joi_1.default.string().label('Status'),
    userId: joi_1.default.string().label('User ID'),
    productId: joi_1.default.string().label('Product ID'),
});
const createProductRequestValidation = (req, res, next) => (0, validator_middleware_1.default)(registerSchema, req.body, next);
exports.createProductRequestValidation = createProductRequestValidation;
const updateProductRequestValidation = (req, res, next) => (0, validator_middleware_1.default)(updateSchema, Object.assign(Object.assign({}, req.body), { productRequestId: req.params.id }), next);
exports.updateProductRequestValidation = updateProductRequestValidation;
exports.default = {
    createProductRequestValidation: exports.createProductRequestValidation,
    updateProductRequestValidation: exports.updateProductRequestValidation,
};
//# sourceMappingURL=productRequest.validation.js.map