import { Request, Response } from "express";
import { TaskService } from "../services/task.service";
import { CreateTaskDto } from "../DTOs/create-task.dto";
import { UpdateTaskDto } from "../DTOs/update-tasks.dto";

export class TaskController {
  private taskService: TaskService;

  constructor(taskService: TaskService) {
    this.taskService = taskService;

    this.getAllTasks = this.getAllTasks.bind(this);
    this.getTaskById = this.getTaskById.bind(this);
    this.createTask = this.createTask.bind(this);
    this.updateTask = this.updateTask.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
  }
  private validateBody(dtoClass: any) {
    return (req: Request, res: Response, next: any) => {
      req.body = Object.assign(new dtoClass(), req.body);
      next();
    };
  }
  public async getAllTasks(req: Request, res: Response): Promise<Response> {
    const tasks = await this.taskService.getAllTasks();
    return res.status(200).json(tasks);
  }

  public async getTaskById(req: Request, res: Response): Promise<Response> {
    const task = await this.taskService.getTaskById(req.params.id ?? "");
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    return res.status(200).json(task);
  }

  public async createTask(req: Request, res: Response): Promise<Response> {
    this.validateBody(CreateTaskDto)(req, res, () => {});
    const taskDto: CreateTaskDto = req.body;
    const newTask = await this.taskService.createTask(taskDto);
    return res.status(201).json(newTask);
  }

  public async updateTask(req: Request, res: Response): Promise<Response> {
    this.validateBody(UpdateTaskDto)(req, res, () => {});
    const taskDto: UpdateTaskDto = req.body;
    const updatedTask = await this.taskService.updateTask(
      req.params.id ?? "",
      taskDto
    );
    return res.status(200).json(updatedTask);
  }

  public async deleteTask(req: Request, res: Response): Promise<Response> {
    const wasDeleted = await this.taskService.deleteTask(req.params.id ?? "");
    if (!wasDeleted) {
      return res.status(404).json({ message: "Task not found" });
    }
    return res.status(204).send();
  }
}
