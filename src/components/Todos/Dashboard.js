import React from "react";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";

const Dashboard = ({ token }) => {
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-4">Todo Dashboard</h2>
      <TodoForm token={token} />
      <TodoList token={token} />
    </div>
  );
};

export default Dashboard;
