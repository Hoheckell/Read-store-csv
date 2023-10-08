
import {Request, Response} from 'express'
import * as service from '../../services/file.service'; 

export const upload = async(req: Request, res: Response) => {
    const uploaded = await service.upload(req, res);
    if(uploaded){
        res.status(200).send({
            message: "Uploaded the file successfully: " + uploaded.originalname,
          });
    }
}