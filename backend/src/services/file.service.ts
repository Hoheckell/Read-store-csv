import { Request, Response } from "express";
import uploadFile from "../api/middlewares/upload";
import fs from "fs";
import csv from "csv-parser";
import * as userService from "./user.service";
import { UserInput } from "../models/user";
import { IUser } from "../api/interfaces/user.interface";

export const upload = async (req: Request, res: Response) => {
  await uploadFile(req, res);
  if (req.file != undefined) {
    await fileExtraction("src/uploads/" + req.file.originalname);
    return req.file
  }
  return false;
};

export const fileExtraction = async (filePath: string) => { 
  readCSVFile(filePath)
    .then(async (data) => {
        data.map(i =>{
            userService.create(i as UserInput)
        })
    })
    .catch((error) => {
      console.error(error);
    }); 
};

export const readCSVFile = (filePath: string): Promise<object[]> => {
  const results: object[] = [];

  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (data) => results.push(data))
      .on("end", () => resolve(results))
      .on("error", (error) => reject(error));
  });
};
