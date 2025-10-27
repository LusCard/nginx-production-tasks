import type { ITask } from "./types";

const API_URL = "http://localhost:3000/api/tasks";
export const fetchTasks = async (): Promise<ITask[]> => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error(`Failed to fetch tasks: ${response.statusText}`);
  }
  return response.json();
};

export const addTask = async (
  title: string,
  description: string
): Promise<ITask> => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, description, state: "PENDING" }),
  });
  if (!response.ok) {
    throw new Error(`Failed to add task: ${response.statusText}`);
  }
  return response.json();
};

export const updateTask = async (
  task: Partial<ITask> & { id: string }
): Promise<ITask> => {
  const response = await fetch(`${API_URL}/${task.id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });
  if (!response.ok) {
    throw new Error(`Failed to update task: ${response.statusText}`);
  }
  return response.json();
};

export const deleteTask = async (id: string): Promise<void> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  if (response.status !== 204 && response.status !== 200) {
    throw new Error(`Failed to delete task: ${response.statusText}`);
  }
};
