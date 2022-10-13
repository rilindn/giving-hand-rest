import express from 'express'
import UserRouter from './auth.route'

const router = express.Router()

router.use('/auth', UserRouter)

export default router
