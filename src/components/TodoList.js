import React, { useState, useEffect } from "react";
import axios from "axios"; // Importing axios for API calls
import TodoItem from "./TodoItem";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  // useEffect to fetch the initial list of todos when the component mounts
  useEffect(() => {
    fetchTodos();
  }, []);

  // Function to fetch todos from the API
  const fetchTodos = async () => {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/todos?_limit=10"
      );
      setTodos(response.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  // Function to add a new todo using the API
  const addTodo = async () => {
    try {
      const response = await axios.post(
        "https://jsonplaceholder.typicode.com/todos",
        {
          title: newTodo,
          completed: false,
        }
      );
      setTodos([response.data, ...todos]);
      setNewTodo("");
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  // Function to delete a todo using the API
  const deleteTodo = async (id) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  return (
    <div>
      <h1>Todo List</h1>
      <div>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button onClick={addTodo}>Add</button>
      </div>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} onDelete={deleteTodo} />
      ))}
    </div>
  );
};

export default TodoList;
