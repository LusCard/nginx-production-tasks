import { ITask } from "./interfaces/task.interface";

const tasks: ITask[] = [];

export class TaskRepository {
  public async findAll(): Promise<ITask[]> {
    return tasks;
  }

  public async findById(id: string): Promise<ITask | null> {
    const task = tasks.find((t) => t.id === id);
    return task || null;
  }
}
