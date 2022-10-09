import express from 'express'
import UserRouter from './user.route'

const router = express.Router()

router.use('/user', UserRouter)

export default router
