"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const product_controller_1 = tslib_1.__importDefault(require("../../controllers/product.controller"));
const product_validation_1 = require("../../validators/product.validation");
const ProductRouter = express_1.default.Router();
ProductRouter.get('/', product_controller_1.default.getAllProducts);
ProductRouter.get('/:id', product_controller_1.default.getProductById);
ProductRouter.get('/my-products/:id', product_controller_1.default.getMyProducts);
ProductRouter.post('/', product_validation_1.createProductValidation, product_controller_1.default.createProduct);
ProductRouter.put('/:id', product_validation_1.updateProductValidation, product_controller_1.default.updateProduct);
ProductRouter.delete('/:id', product_controller_1.default.deleteProduct);
exports.default = ProductRouter;
//# sourceMappingURL=product.route.js.map