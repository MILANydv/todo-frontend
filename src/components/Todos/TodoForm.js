import React, { useState, useEffect } from "react";
import axios from "axios";

const TodoForm = ({ token, currentTodo, setCurrentTodo, fetchTodos }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (currentTodo) {
      setTitle(currentTodo.title || ""); // Default to empty string if title is undefined
      setDescription(currentTodo.description || ""); // Default to empty string if description is undefined
    }
  }, [currentTodo]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (currentTodo) {
        await axios.put(
          `http://localhost:5000/api/todos/${currentTodo._id}`,
          { title, description },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        await axios.post(
          "http://localhost:5000/api/todos",
          { title, description },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }
      setTitle("");
      setDescription("");
      setCurrentTodo(null);
      fetchTodos();
    } catch (err) {
      console.error("Error saving todo", err);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-4">
      <h3 className="text-xl font-semibold mb-2">
        {currentTodo ? "Edit Todo" : "Add Todo"}
      </h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          {currentTodo ? "Update Todo" : "Add Todo"}
        </button>
      </form>
    </div>
  );
};

export default TodoForm;
