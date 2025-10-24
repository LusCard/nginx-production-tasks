import { BlobOptions } from "buffer";
import { CreateTaskDto } from "../DTOs/create-task.dto";
import { UpdateTaskDto } from "../DTOs/update-tasks.dto";
import { ITask } from "../interfaces/task.interface";
import { TaskRepository } from "../repositories/task.repository";

export class TaskService {
  private taskRepository: TaskRepository;

  constructor(repository: TaskRepository) {
    this.taskRepository = repository;
  }

  public async getAllTasks(): Promise<ITask[]> {
    return this.taskRepository.findAll();
  }

  public async getTaskById(id: string): Promise<ITask | null> {
    return this.taskRepository.findById(id);
  }

  public async createTask(taskDto: CreateTaskDto): Promise<ITask> {
    return this.taskRepository.createTask(taskDto);
  }

  public async updateTask(
    id: string,
    taskDto: UpdateTaskDto
  ): Promise<ITask | null> {
    return this.taskRepository.updateTask(id, taskDto);
  }
  public async deleteTask(id: string): Promise<boolean> {
    return this.deleteTask(id);
  }
}
