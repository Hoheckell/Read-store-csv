require('dotenv').config()
import { Dialect, Sequelize } from 'sequelize'


const sequelizeConnection = new Sequelize({ 
  dialect: 'sqlite',
  storage: './database.sqlite',
  logging: false,
})

export default sequelizeConnection