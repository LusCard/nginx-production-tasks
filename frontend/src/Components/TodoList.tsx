import React, { useState } from "react";
import { FaEdit, FaTrashAlt, FaSave, FaTimes } from "react-icons/fa";
import type { ITask, TaskState } from "../types";

interface TodoItemProps {
  task: ITask;
  onUpdate: (task: Partial<ITask> & { id: string }) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

const stateColors: Record<TaskState, string> = {
  PENDING: "bg-red-500",
  IN_PROGRESS: "bg-yellow-500",
  COMPLETED: "bg-green-500",
};

const TodoItem: React.FC<TodoItemProps> = ({ task, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(task.description);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const getNextState = (currentState: TaskState): TaskState => {
    switch (currentState) {
      case "PENDING":
        return "IN_PROGRESS";
      case "IN_PROGRESS":
        return "COMPLETED";
      case "COMPLETED":
        return "PENDING";
      default:
        return "PENDING";
    }
  };

  const handleToggleState = async () => {
    const nextState = getNextState(task.state);
    await onUpdate({ id: task.id, state: nextState });
  };

  const handleSaveEdit = async () => {
    if (
      editTitle.trim() &&
      (editTitle !== task.title || editDescription !== task.description)
    ) {
      setIsSaving(true);
      await onUpdate({
        id: task.id,
        title: editTitle.trim(),
        description: editDescription,
        updatedAt: new Date().toISOString(),
      });
      setIsSaving(false);
    }
    setIsEditing(false);
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    await onDelete(task.id);
    setIsDeleting(false);
  };

  const stateClass = stateColors[task.state];

  return (
    <li className="flex p-4 mb-2 bg-white shadow-lg rounded-lg border border-gray-200 transition duration-300">
      <div className="flex flex-col space-y-2 mr-4 shrink-0">
        {isEditing ? (
          <>
            <button
              onClick={handleSaveEdit}
              disabled={isSaving || !editTitle.trim()}
              className="p-2 text-white bg-green-500 rounded-md hover:bg-green-600 transition disabled:opacity-50"
              title="Save"
            >
              <FaSave size={16} />
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="p-2 text-white bg-red-500 rounded-md hover:bg-red-600 transition"
              title="Cancel"
            >
              <FaTimes size={16} />
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setIsEditing(true)}
              className="p-2 text-white bg-yellow-500 rounded-md hover:bg-yellow-600 transition"
              title="Edit"
            >
              <FaEdit size={16} />
            </button>
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="p-2 text-white bg-red-600 rounded-md hover:bg-red-700 transition disabled:opacity-50"
              title="Delete"
            >
              {isDeleting ? "..." : <FaTrashAlt size={16} />}
            </button>
          </>
        )}
      </div>

      <div className="grow">
        {isEditing ? (
          <div className="space-y-2">
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="w-full text-xl font-bold p-1 border-b-2 border-blue-400 focus:outline-none"
            />
            <textarea
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              rows={2}
              className="w-full text-gray-600 p-1 border-b-2 border-blue-400 focus:outline-none resize-none"
            />
          </div>
        ) : (
          <div onClick={handleToggleState} className="cursor-pointer">
            <h3
              className={`text-xl font-bold ${
                task.state === "COMPLETED"
                  ? "line-through text-gray-500"
                  : "text-gray-800"
              }`}
            >
              {task.title}
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              {task.description || "No description provided"}
            </p>
          </div>
        )}

        <div className="flex justify-between items-center mt-3">
          <span
            className={`text-xs font-semibold px-2 py-1 rounded-full text-white ${stateClass}`}
          >
            {task.state.replace("_", " ")}
          </span>
          <span className="text-xs text-gray-400">
            {isEditing
              ? `ID: ${task.id.substring(0, 8)}...`
              : `Updated: ${new Date(task.updatedAt).toLocaleString()}`}
          </span>
        </div>
      </div>
    </li>
  );
};

export default TodoItem;
