import { DataTypes, Model, Optional } from "sequelize";  
import sequelizeConnection from "../db/config";

interface UserAttributes {
  id: number;
  name: string;
  city: string;
  country: string;
  favorite_sport: string;
}
export interface UserInput extends Optional<UserAttributes, "id"> {}
export interface UserOuput extends Required<UserAttributes> {}

class User extends Model<UserAttributes, UserInput> implements UserAttributes {
  public id!: number;
  public name!: string;
  public city!: string;
  public country!: string;
  public favorite_sport!: string;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    favorite_sport: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { 
    sequelize: sequelizeConnection, 
  },
);

export default User;
