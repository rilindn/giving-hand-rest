import express from 'express'
import UserRouter from './user.route'
import ProductRouter from './product.route'
import ProductRequestRouter from './productRequest.route'
import NotificationRouter from './notification.route'
import ChatRouter from './chat.route'

const router = express.Router()

router.use('/user', UserRouter)
router.use('/product', ProductRouter)
router.use('/product-request', ProductRequestRouter)
router.use('/notification', NotificationRouter)
router.use('/chat', ChatRouter)

export default router
