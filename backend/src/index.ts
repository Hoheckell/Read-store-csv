import express, { Application, NextFunction, Request, Response } from "express";
import routes from "./api/routes";
import dbInit from "./db/init";
import cors from "cors";  
import clientErrorHandler from "./api/middlewares/client-error";
import errorHandler from "./api/middlewares/error";
import logErrors from "./api/middlewares/log-error";

dbInit();

const port = 3000;

export const get = () => {
  const app: Application = express();

  app.use(cors<Request>());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true })); 
  app.use(logErrors);
  app.use(clientErrorHandler);
  app.use(errorHandler);
  app.get("/", async (req: Request, res: Response): Promise<Response> => {
    return res
      .status(200)
      .send({
        message: `Welcome to SP application test API! \n Endpoints available at http://localhost:${port}/api/`,
      });
  });

  app.use("/api", routes);

  return app;
};

export const start = () => {
  const app = get();
  try {
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  } catch (error: any) {
    console.log(`Error occurred: ${error.message}`);
  }
}; 

start();
