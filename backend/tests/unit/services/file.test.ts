import { afterAll, describe, expect, jest, test } from "@jest/globals"; 
import * as fileService from "../../../src/services/file.service"; 
import { upload, fileExtraction, readCSVFile } from "../../../src/services/file.service"; 
import { getMockRes, getMockReq } from '@jest-mock/express';
import { create } from "../../../src/repositories/user.repository";
import uploadFile from "../../../src/api/middlewares/upload";


jest.mock("../../../src/services/file.service", () => ({
    upload: jest.fn(),  
})); 

const mockDate = new Date("08 Oct 2023");

const dateSpy = jest.spyOn(global, "Date").mockImplementation(() => mockDate);

describe("File Service", () => {
  afterAll(() => {
    dateSpy.mockRestore();
  }); 

  describe("Upload", () => {
    it("should accept a payload and call the repository with it", async () => {
        const req = getMockReq();
        const { res } = getMockRes();
      await fileService.upload(req, res);

      expect(upload).toBeCalledTimes(1);  
      expect(upload).toHaveBeenCalledWith(req, res);
    });
  });
});
