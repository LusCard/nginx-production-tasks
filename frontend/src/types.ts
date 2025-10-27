export type TaskState = "PENDING" | "IN_PROGRESS" | "COMPLETED";

export interface ITask {
  id: string;
  title: string;
  description: string;
  state: TaskState;
  createdAt: string;
  updatedAt: string;
}
