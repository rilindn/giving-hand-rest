import express from 'express'
import ProductController from '../../controllers/product.controller'
import {
  createProductValidation,
  updateProductValidation,
} from '../../validators/product.validation'

const ProductRouter = express.Router()

ProductRouter.get('/', ProductController.getAllProducts)
ProductRouter.get('/:id', ProductController.getProductById)
ProductRouter.get('/my-products/:id', ProductController.getMyProducts)
ProductRouter.post(
  '/',
  createProductValidation,
  ProductController.createProduct,
)
ProductRouter.put(
  '/:id',
  updateProductValidation,
  ProductController.updateProduct,
)
ProductRouter.delete('/:id', ProductController.deleteProduct)

export default ProductRouter
