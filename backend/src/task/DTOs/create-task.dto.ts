import { TaskState } from "../interfaces/task.interface";

export class CreateTaskDto {
  public title: string;
  public description: string;
  public state: TaskState = TaskState.PENDING;
}
