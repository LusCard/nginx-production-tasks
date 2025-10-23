import express, { Application } from "express";
import "reflect-metadata";
import taskRouter from "./modules/task/routes/task.route";

export const createApp = () => {
  const app: Application = express();

  app.use(express.json());

  app.get("/", (req, res) => {
    res.send("Task mangr api running");
  });

  return app;
};
