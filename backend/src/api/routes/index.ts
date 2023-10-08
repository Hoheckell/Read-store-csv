
import { Router } from 'express'
import usersRouter from './users'
import filesRouter from './files'

const router = Router()

router.use('/files', filesRouter)
router.use('/users', usersRouter)

export default router