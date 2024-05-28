import sequelize from "sequelize";
import { DB_NAME, DB_PASS, DB_USER } from "./config.js";

export const db = new sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: "localhost",
  dialect: "postgres",
});
