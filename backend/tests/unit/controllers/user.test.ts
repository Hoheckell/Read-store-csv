import { afterAll, describe, expect, jest, test } from "@jest/globals";
import { UserInput } from "../../../src/models/user";
import * as UserController from "../../../src/controllers/user/users"; 
import {
  update,
  create,
  getById,
  deleteById,
  getAll,
} from "../../../src/controllers/user/users";
import { CreateUserDTO, FilterUserDTO } from "../../../src/api/dto/user.dto";

const createUserDto: CreateUserDTO = {
  name: "test name",
  city: "test city",
  country: "test country",
  favorite_sport: "tst sport",
};

const updateUserDto: CreateUserDTO = {
  name: "test name",
  city: "test city",
  country: "test country",
  favorite_sport: "tst sport",
};

const filter: FilterUserDTO = {
  q: "usa",
};

jest.mock(".../../../src/controllers/user/users", () => ({
  create: jest.fn(),
  update: jest.fn(),
  getById: jest.fn(),
  deleteById: jest.fn(),
  getAll: jest.fn(),
}));

const mockDate = new Date("08 Oct 2023");

const dateSpy = jest.spyOn(global, "Date").mockImplementation(() => mockDate);

describe("Users Controller", () => {
  afterAll(() => {
    dateSpy.mockRestore();
  });

  describe("Create", () => {
    it("should accept a payload and call the controller with it", async () => {
      await UserController.create(createUserDto);

      expect(create).toBeCalledTimes(1);
      expect(create).toHaveBeenCalledWith(createUserDto);
    });
  });

  describe("Update", () => {
    it("should accept a payload and call the controller with it", async () => {
      await UserController.update(1, updateUserDto);

      expect(update).toBeCalledTimes(1);
      expect(update).toHaveBeenCalledWith(1, updateUserDto);
    });
  });

  describe("GetById", () => {
    it("should accept a payload and call the controller with it", async () => {
      await UserController.getById(1);

      expect(getById).toBeCalledTimes(1);
      expect(getById).toHaveBeenCalledWith(1);
    });
  });

  describe("DeleteById", () => {
    it("should accept a payload and call the controller with it", async () => {
      await UserController.deleteById(1);

      expect(deleteById).toBeCalledTimes(1);
      expect(deleteById).toHaveBeenCalledWith(1);
    });
  });

  describe("GetAll", () => {
    it("should accept a payload and call the controller with it", async () => {
      await UserController.getAll(filter);

      expect(getAll).toBeCalledTimes(1);
      expect(getAll).toHaveBeenCalledWith(filter);
    });
  });
});
