import React, { useState } from "react";

interface TodoFormProps {
  onAdd: (title: string, description: string) => void;
  isSubmitting: boolean;
}

const TodoForm: React.FC<TodoFormProps> = ({ onAdd, isSubmitting }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onAdd(title.trim(), description.trim());
      setTitle("");
      setDescription("");
    }
  };

  const isDisabled = !title.trim() || isSubmitting;

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col p-4 mb-4 bg-white shadow-lg rounded-lg border border-gray-200"
    >
      <div className="flex flex-col space-y-2 mb-4">
        <input
          type="text"
          placeholder="Task Title (Required)"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="p-3 border-2 border-gray-300 rounded-md focus:border-blue-500 focus:outline-none text-gray-800 transition"
        />
        <textarea
          placeholder="Task Description (Optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={2}
          className="p-3 border-2 border-gray-300 rounded-md focus:border-blue-500 focus:outline-none text-gray-800 resize-none transition"
        />
      </div>

      <button
        type="submit"
        className={`px-4 py-2 font-bold rounded-md transition duration-150 ease-in-out ${
          isDisabled
            ? "bg-gray-400 text-gray-600 cursor-not-allowed"
            : "bg-blue-600 text-white hover:bg-blue-700"
        }`}
        disabled={isDisabled}
      >
        {isSubmitting ? "Adding..." : "Add Task"}
      </button>
    </form>
  );
};

export default TodoForm;
