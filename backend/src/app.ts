import express, { Application } from "express";
import "reflect-metadata";
import { AppDataSource } from "./config/postgre-db.config";
import { Task } from "./modules/task/models/task.model";
import { TaskRepository } from "./modules/task/repositories/task.repository";
import { TaskService } from "./modules/task/services/task.service";
import { TaskRoutes } from "./modules/task/routes/task.route";
import { TaskController } from "./modules/task/controllers/task.controller";

export const createApp = () => {
  const app: Application = express();
  app.use(express.json());
  try {
    const ormRepository = AppDataSource.getRepository(Task);
    const taskRepository = new TaskRepository(ormRepository);
    const taskService = new TaskService(taskRepository);
    const taskController = new TaskController(taskService);
    app.use("/api/tasks", TaskRoutes(taskController));

    app.get("/", (req, res) => {
      res.send("Task mangr api running");
    });
  } catch (error) {
    console.log("Error al iniciar la aplicación", error);
    process.exit(1);
  }

  return app;
};
