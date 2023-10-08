import { afterAll, describe, expect, jest, test } from "@jest/globals";
import { UserInput } from "../../../src/models/user";
import * as userService from "../../../src/services/user.service";
import { GetAllUsersFilters } from '../../../src/api/interfaces/filters';
import {
  update,
  create,
  getById,
  deleteById,
  getAll,
} from "../../../src/services/user.service";

const userInput: UserInput = {
  name: "test name",
  city: "test city",
  country: "test country",
  favorite_sport: "tst sport",
};

const filter: GetAllUsersFilters = {
    q:"usa"
}

jest.mock("../../../src/services/user.service", () => ({
  create: jest.fn(),
  update: jest.fn(),
  getById: jest.fn(),
  deleteById: jest.fn(),
  getAll: jest.fn(),
}));

const mockDate = new Date("08 Oct 2023");

const dateSpy = jest.spyOn(global, "Date").mockImplementation(() => mockDate);

describe("User Service", () => {
  afterAll(() => {
    dateSpy.mockRestore();
  });

  describe("Create", () => {
    it("should accept a payload and call the service with it", async () => {
      await userService.create(userInput);

      expect(create).toBeCalledTimes(1);
      expect(create).toHaveBeenCalledWith(userInput);
    });
  });

  describe("Update", () => {
    it("should accept a payload and call the service with it", async () => {
      await userService.update(1, userInput);

      expect(update).toBeCalledTimes(1);
      expect(update).toHaveBeenCalledWith(1, userInput);
    });
  });

  describe("GetById", () => {
    it("should accept a payload and call the service with it", async () => {
      await userService.getById(1);

      expect(getById).toBeCalledTimes(1);
      expect(getById).toHaveBeenCalledWith(1);
    });
  });

  describe("DeleteById", () => {
    it("should accept a payload and call the service with it", async () => {
      await userService.deleteById(1);

      expect(deleteById).toBeCalledTimes(1);
      expect(deleteById).toHaveBeenCalledWith(1);
    });
  });

  describe("GetAll", () => {
    it("should accept a payload and call the service with it", async () => {
      await userService.getAll(filter);

      expect(getAll).toBeCalledTimes(1);
      expect(getAll).toHaveBeenCalledWith(filter);
    });
  });
});
