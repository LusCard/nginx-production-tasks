import { TaskState } from "../interfaces/task.interface";

export class UpdateTaskDto {
  title?: string;
  description?: string;
  state?: TaskState;
}
