import { NextFunction, Request, Response } from "express";

const logErrors = (err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    next(err);
  }
  export default logErrors;