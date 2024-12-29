import { Sequelize } from "sequelize";
import * as dotenv from "dotenv";

dotenv.config();

const db = new Sequelize(
  process.env.DB_NAME || "",
  process.env.DB_USER || "",
  process.env.DB_PASSWORD || "",
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT as any, // 'any' porque Sequelize no tiene un tipo directo para el dialecto
    logging: false, // Puedes activarlo o desactivarlo según necesites
  }
);


export default db;
