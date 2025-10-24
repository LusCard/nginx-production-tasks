import { Repository } from "typeorm";
import { Task } from "../models/task.model";
import { ITask } from "../interfaces/task.interface";
import { CreateTaskDto } from "../DTOs/create-task.dto";
import { UpdateTaskDto } from "../DTOs/update-tasks.dto";

export class TaskRepository {
  private ormRepository: Repository<Task>;

  constructor(ormRepository: Repository<Task>) {
    this.ormRepository = ormRepository;
  }

  public async findAll(): Promise<ITask[]> {
    return this.ormRepository.find();
  }

  public async findById(id: string): Promise<ITask | null> {
    return this.ormRepository.findOneBy({ id });
  }

  public async createTask(createTaskDto: CreateTaskDto): Promise<ITask> {
    const newTask = this.ormRepository.create(createTaskDto as Partial<ITask>);

    return this.ormRepository.save(newTask);
  }

  public async updateTask(
    id: string,
    updateTaskDto: UpdateTaskDto
  ): Promise<ITask | null> {
    await this.ormRepository.update(id, updateTaskDto as Partial<ITask>);

    return this.ormRepository.findOneBy({ id });
  }

  public async deleteTask(id: string): Promise<boolean> {
    const deletedResult = await this.ormRepository.delete(id);

    return (deletedResult.affected ?? 0) > 0;
  }
}
