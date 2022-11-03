import express from 'express'
import UserRouter from './user.route'
import ProductRouter from './product.route'
import ProductRequestRouter from './productRequest.route'

const router = express.Router()

router.use('/user', UserRouter)
router.use('/product', ProductRouter)
router.use('/product-request', ProductRequestRouter)

export default router
