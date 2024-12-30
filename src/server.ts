import express, { Application } from "express";
import router from "./routes/index.routes";
import cors from "cors";
import db from './database/connection';
import "./models/user.model";
import "./models/category.model";
import "./models/task.model";

class Server {
  private app: Application;
  private port: string | number;
  
 
  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use("/api", router);
  }
  
  async dbConnection() {
    try {
      // Sincronizar la base de datos
      await db.sync({force: false, alter:false }); // Cambiar a { alter: true } en producción
      console.log("Tablas sincronizadas correctamente.");
    } catch (error) {
      console.error("Error al sincronizar las tablas:", error);
    }
    try {
      await db.authenticate();
      console.log("Database online");
    } catch (error) {
      throw new Error(String(error));
    }
  }
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 8000;
    this.dbConnection();
    this.middlewares();
    this.routes();
  }
  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server en el port ${this.port}`);
    });
  }
}
export default Server;
