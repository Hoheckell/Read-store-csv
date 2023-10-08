import { IUser } from "../interfaces/user.interface";
import axios from "axios";
import { ISearch } from "../interfaces/search.Interface";

export const userService = {
  async getUsers(): Promise<IUser[]> {
    return await axios
      .get(`${process.env.REACT_APP_API_URL}/users`)
      .then(async (response) => {
        if (response.status === 200) {
          return response.data;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  },
  async search(data: ISearch): Promise<IUser[]> {
    data = this.clean(data)
    const qs = "?" + new URLSearchParams({ ...data }).toString();
    return await axios
      .get(`${process.env.REACT_APP_API_URL}/users${qs}`)
      .then(async (response) => {
        if (response.status === 200) {
          return response.data;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  },
  clean (obj: any) {
    for (let propName in obj) {
      if (obj[propName] === "") {
        delete obj[propName];
      }
    }
    return obj
  }
};
