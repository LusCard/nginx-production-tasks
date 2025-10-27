import React, { useState, useEffect, useCallback } from "react";
import type { ITask } from "./types";
import { addTask, deleteTask, fetchTasks, updateTask } from "./api";
import TodoForm from "./Components/TodoForm";
import TodoItem from "./Components/TodoList";

const App: React.FC = () => {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadTasks = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchTasks();
      setTasks(data);
    } catch (err) {
      console.error("Failed to fetch tasks:", err);
      setError("Failed to load tasks");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  const handleAddTask = async (title: string, description: string) => {
    setIsAdding(true);
    setError(null);
    try {
      const newTask = await addTask(title, description);
      setTasks((prevTasks) => [...prevTasks, newTask]);
    } catch (err) {
      console.error("Failed to add task:", err);
      setError("Could not add task. Check server status.");
    } finally {
      setIsAdding(false);
    }
  };

  const handleUpdateTask = async (
    taskUpdate: Partial<ITask> & { id: string }
  ) => {
    setError(null);
    try {
      const updatedTask = await updateTask(taskUpdate);
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === updatedTask.id ? updatedTask : task
        )
      );
    } catch (err) {
      console.error("Failed to update task:", err);
      setError(`Failed to update task ${taskUpdate.id}.`);
    }
  };

  const handleDeleteTask = async (id: string) => {
    setError(null);
    try {
      await deleteTask(id);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    } catch (err) {
      console.error("Failed to delete task:", err);
      setError(`Failed to delete task ${id}.`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center mb-6 text-gray-800">
          Task Manager
        </h1>

        <TodoForm onAdd={handleAddTask} isSubmitting={isAdding} />

        {isLoading && (
          <p className="text-center text-blue-600 p-4">Loading tasks...</p>
        )}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
            <strong className="font-bold">API Error:</strong>
            <span className="block sm:inline ml-2">{error}</span>
          </div>
        )}

        {!isLoading && tasks.length === 0 && !error && (
          <p className="text-center text-gray-500 p-4 bg-white shadow-lg rounded-lg">
            No tasks found. Get started by adding one above!
          </p>
        )}

        <ul className="list-none p-0 space-y-4">
          {tasks.map((task) => (
            <TodoItem
              key={task.id}
              task={task}
              onUpdate={handleUpdateTask}
              onDelete={handleDeleteTask}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
