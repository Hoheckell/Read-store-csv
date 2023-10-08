import { Router, Request, Response} from 'express'
import * as filesController from '../../controllers/file/files'

const filesRouter = Router()


filesRouter.post('/upload', async (req: Request, res: Response) => { 
    const result = await filesController.upload(req, res)
    return res.status(200).send(result)
  })

export default filesRouter;