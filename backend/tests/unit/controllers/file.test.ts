import { afterAll, describe, expect, jest, test } from "@jest/globals"; 
import * as filesController from "../../../src/controllers/file/files"; 
import { upload } from "../../../src/controllers/file/files"; 
import { getMockRes, getMockReq } from '@jest-mock/express';  


jest.mock("../../../src/controllers/file/files", () => ({
    upload: jest.fn(),  
})); 

const mockDate = new Date("08 Oct 2023");

const dateSpy = jest.spyOn(global, "Date").mockImplementation(() => mockDate);

describe("Files Controller", () => {
  afterAll(() => {
    dateSpy.mockRestore();
  }); 

  describe("Upload", () => {
    it("should accept a payload and call the controller with it", async () => {
        const req = getMockReq();
        const { res } = getMockRes();
      await filesController.upload(req, res);
      
      expect(upload).toBeCalledTimes(1);  
      expect(upload).toHaveBeenCalledWith(req, res);
    });
  });
});
