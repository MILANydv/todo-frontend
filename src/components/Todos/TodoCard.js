import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import axios from "axios";

const TodoCard = ({ todo, onEdit, onDelete, token }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/todos/${todo._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      onDelete(todo._id);
    } catch (err) {
      console.error("Error deleting todo", err);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-4">
      <h4 className="text-xl font-semibold mb-2">{todo.title || "Untitled"}</h4>
      <p className="text-gray-700 mb-4">
        {todo.description || "No description"}
      </p>
      <div className="flex justify-end space-x-2">
        <button
          onClick={() => onEdit(todo)}
          className="text-blue-600 hover:text-blue-700"
        >
          <FaEdit />
        </button>
        <button
          onClick={handleDelete}
          className="text-red-600 hover:text-red-700"
        >
          <FaTrash />
        </button>
      </div>
    </div>
  );
};

export default TodoCard;
