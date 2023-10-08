import { Router, Request, Response, NextFunction } from "express";
import * as userController from "../../controllers/user/users";
import { CreateUserDTO, FilterUserDTO, UpdateUserDTO } from "../dto/user.dto";

const usersRouter = Router();

usersRouter.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
  const id = Number(req.params.id);
  const result = await userController.getById(id);
  if (result) {
    return res.status(200).send(result);
  }
});

usersRouter.put("/:id", async (req: Request, res: Response, next: NextFunction) => {
  const id = Number(req.params.id);
  const payload: UpdateUserDTO = req.body;

  const result = await userController.update(id, payload);
  if (result) {
    return res.status(201).send(result);
  }
});

usersRouter.delete("/:id", async (req: Request, res: Response, next: NextFunction) => {
  const id = Number(req.params.id);

  const result = await userController.deleteById(id);
  if (result) {
    return res.status(204).send({
      success: result,
    });
  }
});

usersRouter.post("/", async (req: Request, res: Response, next: NextFunction) => {
  const payload: CreateUserDTO = req.body;
  const result = await userController.create(payload);
  if (result) {
    return res.status(200).send(result);
  }
});

usersRouter.get("/", async (req: Request, res: Response, next: NextFunction) => {
  const filters: FilterUserDTO = req.query;
  const results = await userController.getAll(filters);
  if (results) {
    return res.status(200).send(results);
  }
});

export default usersRouter;
