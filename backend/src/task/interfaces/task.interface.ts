export enum TaskState {
  PENDING = "PENDING",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
}

export interface ITask {
  id: string;
  title: string;
  description: string;
  state: TaskState;
  createdAt: Date;
  updatedAt: Date;
}
