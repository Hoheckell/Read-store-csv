import { Router, Request, Response, NextFunction } from "express";
import * as userController from "../../controllers/user/users";
import { CreateUserDTO, FilterUserDTO, UpdateUserDTO } from "../dto/user.dto";

const usersRouter = Router();

usersRouter.get(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const id = Number(req.params.id);
    return await userController
      .getById(id)
      .then((response) => {
        if (response) {
          return res.status(200).send(response);
        }
      })
      .catch((err) => {
        return res.json({ error: err });
      });
  },
);

usersRouter.put(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const id = Number(req.params.id);
    const payload: UpdateUserDTO = req.body;
    return await userController
      .update(id, payload)
      .then((response) => {
        if (response) {
          return res.status(200).send(response);
        }
      })
      .catch((err) => {
        return res.json({ error: err });
      });
  },
);

usersRouter.delete(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const id = Number(req.params.id);
    return await userController
      .deleteById(id)
      .then((response) => {
        if (response) {
          return res.status(204).send();
        }
      })
      .catch((err) => {
        return res.json({ error: err });
      });
  },
);

usersRouter.post(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    const payload: CreateUserDTO = req.body;
    return await userController
      .create(payload)
      .then((response) => {
        if (response) {
          return res.status(201).send(response);
        }
      })
      .catch((err) => {
        return res.json({ error: err });
      });
  },
);

usersRouter.get(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    const filters: FilterUserDTO = req.query;
    return await userController
      .getAll(filters)
      .then((response) => {
        if (response) {
          return res.status(200).send(response);
        }
      })
      .catch((err) => {
        return res.json({ error: err });
      });
  },
);

export default usersRouter;
