import React, { useState, useEffect } from "react";
import axios from "axios";
import TodoCard from "./TodoCard";
import TodoForm from "./TodoForm";

const TodoList = ({ token }) => {
  const [todos, setTodos] = useState([]);
  const [currentTodo, setCurrentTodo] = useState(null);

  const fetchTodos = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/todos", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTodos(response.data);
    } catch (err) {
      console.error("Error fetching todos", err);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, [token]);

  const handleEdit = (todo) => {
    setCurrentTodo(todo);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/todos/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTodos(todos.filter((todo) => todo._id !== id));
    } catch (err) {
      console.error("Error deleting todo", err);
    }
  };

  return (
    <div>
      {todos.map((todo) => (
        <TodoCard
          key={todo._id}
          todo={todo}
          onEdit={handleEdit}
          onDelete={handleDelete}
          token={token}
        />
      ))}
      <TodoForm
        token={token}
        currentTodo={currentTodo}
        setCurrentTodo={setCurrentTodo}
        fetchTodos={fetchTodos}
      />
    </div>
  );
};

export default TodoList;
