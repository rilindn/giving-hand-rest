'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
const tslib_1 = require('tslib')
const express_1 = tslib_1.__importDefault(require('express'))
const productRequest_controller_1 = tslib_1.__importDefault(
  require('../../controllers/productRequest.controller'),
)
const productRequest_validation_1 = require('../../validators/productRequest.validation')
const ProductRequestRouter = express_1.default.Router()
ProductRequestRouter.get(
  '/',
  productRequest_controller_1.default.getAllProductRequests,
)
ProductRequestRouter.get(
  '/my-requests/:id',
  productRequest_controller_1.default.getMyRequests,
)
ProductRequestRouter.get(
  '/:id',
  productRequest_controller_1.default.getProductRequestById,
)
ProductRequestRouter.post(
  '/',
  productRequest_validation_1.createProductRequestValidation,
  productRequest_controller_1.default.createProductRequest,
)
ProductRequestRouter.put(
  '/:id',
  productRequest_validation_1.updateProductRequestValidation,
  productRequest_controller_1.default.updateProductRequest,
)
ProductRequestRouter.delete(
  '/:id',
  productRequest_controller_1.default.deleteProductRequest,
)
exports.default = ProductRequestRouter
//# sourceMappingURL=productRequest.route.js.map
