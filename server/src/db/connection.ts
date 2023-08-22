import fs from "fs";
import mysql from "mysql2";
import { Sequelize } from "sequelize";

export const sequelize = new Sequelize({
  username: process.env.GLORZO_DB_USER,
  host: process.env.GLORZO_DB_HOST,
  database: process.env.GLORZO_DB_DATABASE,
  password: process.env.GLORZO_DB_PASSWORD,
  dialect: "mysql",
  dialectModule: mysql,
  dialectOptions: {
    ssl: {
      ca: fs.readFileSync(process.env.GLORZO_DB_CA!),
    },
  },
  ssl: true,
  define: {
    freezeTableName: true,
  },
});
