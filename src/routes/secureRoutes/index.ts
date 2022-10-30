import express from 'express'
import UserRouter from './user.route'
import ProductRouter from './product.route'

const router = express.Router()

router.use('/user', UserRouter)
router.use('/product', ProductRouter)

export default router
