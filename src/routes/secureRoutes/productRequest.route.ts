import express from 'express'
import ProductRequestController from '@controllers/productRequest.controller'
import {
  createProductRequestValidation,
  updateProductRequestValidation,
} from '@validators/productRequest.validation'

const ProductRequestRouter = express.Router()

ProductRequestRouter.get('/', ProductRequestController.getAllProductRequests)
ProductRequestRouter.get('/:id', ProductRequestController.getProductRequestById)
ProductRequestRouter.post(
  '/',
  createProductRequestValidation,
  ProductRequestController.createProductRequest,
)
ProductRequestRouter.put(
  '/',
  updateProductRequestValidation,
  ProductRequestController.updateProductRequest,
)
ProductRequestRouter.delete(
  '/:id',
  ProductRequestController.deleteProductRequest,
)

export default ProductRequestRouter
