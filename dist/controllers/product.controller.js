"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const product_service_1 = tslib_1.__importDefault(require("../src/services/product.service"));
function getAllProducts(req, res, next) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const { search = '', categories = '', limit = 12, offset = 0, excludeIds = '', } = req.query;
        try {
            const products = yield product_service_1.default.getProducts({
                search,
                categories,
                limit,
                offset,
                excludeIds,
            });
            return res.send(products);
        }
        catch (error) {
            next(error);
        }
    });
}
function getProductById(req, res, next) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        try {
            const product = yield product_service_1.default.getProductById(id);
            return res.send(product);
        }
        catch (error) {
            next(error);
        }
    });
}
function getMyProducts(req, res, next) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        const { search, categories } = req.query;
        try {
            const products = yield product_service_1.default.getMyProducts(id, search, categories);
            return res.send(products);
        }
        catch (error) {
            next(error);
        }
    });
}
function createProduct(req, res, next) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            const product = yield product_service_1.default.createProduct(req.body);
            return res.send(product);
        }
        catch (error) {
            next(error);
        }
    });
}
function updateProduct(req, res, next) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        try {
            const product = yield product_service_1.default.updateProduct(id, req.body);
            return res.send(product);
        }
        catch (error) {
            next(error);
        }
    });
}
function deleteProduct(req, res, next) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        try {
            const product = yield product_service_1.default.deleteProduct(id);
            return res.send(product);
        }
        catch (error) {
            next(error);
        }
    });
}
exports.default = {
    getAllProducts,
    getMyProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
};
//# sourceMappingURL=product.controller.js.map