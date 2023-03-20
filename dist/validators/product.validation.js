"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProductValidation = exports.createProductValidation = void 0;
const tslib_1 = require("tslib");
const joi_1 = tslib_1.__importDefault(require("joi"));
const validator_middleware_1 = tslib_1.__importDefault(require("@middleware/validator.middleware"));
const registerSchema = joi_1.default.object({
    title: joi_1.default.string().required().label('Title'),
    description: joi_1.default.string().required().label('Description'),
    images: joi_1.default.array()
        .items(joi_1.default.object({
        url: joi_1.default.string().required(),
    }))
        .label('Images'),
    categories: joi_1.default.array().items(joi_1.default.string().required()).label('Categories'),
    location: joi_1.default.object({
        lat: joi_1.default.number().required(),
        lng: joi_1.default.number().required(),
        address: joi_1.default.string().required(),
    }).label('Location'),
    userId: joi_1.default.string().required().label('User ID'),
});
const updateSchema = joi_1.default.object({
    productId: joi_1.default.string().required().label('Product ID'),
    title: joi_1.default.string().label('Title'),
    description: joi_1.default.string().label('Description'),
    images: joi_1.default.array()
        .items(joi_1.default.object({
        url: joi_1.default.string().required(),
    }))
        .label('Images'),
    categories: joi_1.default.array().items(joi_1.default.string().required()).label('Categories'),
    location: joi_1.default.object({
        lat: joi_1.default.number().required(),
        lng: joi_1.default.number().required(),
        address: joi_1.default.string().required(),
    }).label('Location'),
    userId: joi_1.default.string().label('User ID'),
});
const createProductValidation = (req, res, next) => (0, validator_middleware_1.default)(registerSchema, req.body, next);
exports.createProductValidation = createProductValidation;
const updateProductValidation = (req, res, next) => (0, validator_middleware_1.default)(updateSchema, Object.assign(Object.assign({}, req.body), { productId: req.params.id }), next);
exports.updateProductValidation = updateProductValidation;
exports.default = {
    createProductValidation: exports.createProductValidation,
    updateProductValidation: exports.updateProductValidation,
};
//# sourceMappingURL=product.validation.js.map