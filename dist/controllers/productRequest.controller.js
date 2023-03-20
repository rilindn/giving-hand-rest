"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const productRequest_service_1 = tslib_1.__importDefault(require("../services/productRequest.service"));
function getAllProductRequests(req, res, next) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            const productRequests = yield productRequest_service_1.default.getProductRequests();
            return res.send(productRequests);
        }
        catch (error) {
            next(error);
        }
    });
}
function getMyRequests(req, res, next) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        const { search, status } = req.query;
        try {
            const products = yield productRequest_service_1.default.getMyRequests(id, search, status);
            return res.send(products);
        }
        catch (error) {
            next(error);
        }
    });
}
function getProductRequestById(req, res, next) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        try {
            const productRequest = yield productRequest_service_1.default.getProductRequestById(id);
            return res.send(productRequest);
        }
        catch (error) {
            next(error);
        }
    });
}
function createProductRequest(req, res, next) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            const productRequest = yield productRequest_service_1.default.createProductRequest(req.body);
            return res.send(productRequest);
        }
        catch (error) {
            next(error);
        }
    });
}
function updateProductRequest(req, res, next) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        try {
            const productRequest = yield productRequest_service_1.default.updateProductRequest(id, req.body);
            return res.send(productRequest);
        }
        catch (error) {
            next(error);
        }
    });
}
function deleteProductRequest(req, res, next) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const { id } = req.query;
        try {
            const productRequest = yield productRequest_service_1.default.deleteProductRequest(id);
            return res.send(productRequest);
        }
        catch (error) {
            next(error);
        }
    });
}
exports.default = {
    getAllProductRequests,
    getMyRequests,
    getProductRequestById,
    createProductRequest,
    updateProductRequest,
    deleteProductRequest,
};
//# sourceMappingURL=productRequest.controller.js.map