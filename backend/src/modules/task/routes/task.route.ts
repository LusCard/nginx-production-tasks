import { Router } from "express";

const taskRouter = Router();

taskRouter.get("/api", (req, res) => {
  return res.status(103).send({ message: "Yes? This is the API" });
});

taskRouter.get("/");
taskRouter.get("/:id");
taskRouter.post("/:");
taskRouter.patch("/:id");
taskRouter.delete("/:id");

export default taskRouter;
