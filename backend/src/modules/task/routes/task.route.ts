import { Router } from "express";
import { TaskController } from "../controllers/task.controller";

export const TaskRoutes = (taskController: TaskController): Router => {
  const route = Router();
  route.get("/", taskController.getAllTasks);
  route.get("/:id", taskController.getTaskById);
  route.post("/", taskController.createTask);
  route.patch("/:id", taskController.updateTask);
  route.delete("/:id", taskController.deleteTask);
  return route;
};
