// src/App.jsx
import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid'; // Import uuid
import TodoForm from './components/TodoForm';
import TodoItem from './components/TodoItem';

function App() {
  // State lưu danh sách các todos
  const [todos, setTodos] = useState(() => {
    // Khởi tạo state từ localStorage nếu có
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  // State lưu todo đang được chỉnh sửa
  const [editingTodo, setEditingTodo] = useState(null);

  // Lưu todos vào localStorage mỗi khi state todos thay đổi
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  // Hàm thêm mới todo
  const addTodo = (task) => {
    const newTodo = {
      id: uuidv4(), // Tạo ID duy nhất
      task: task,
      completed: false,
    };
    setTodos([...todos, newTodo]);
  };

  // Hàm xóa todo
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
    // Nếu todo đang xóa là todo đang sửa, hủy chế độ sửa
    if (editingTodo && editingTodo.id === id) {
        setEditingTodo(null);
    }
  };

  // Hàm toggle trạng thái hoàn thành
  const toggleComplete = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  // Hàm bật chế độ chỉnh sửa
  const handleEdit = (todoToEdit) => {
    setEditingTodo(todoToEdit);
  };

  // Hàm cập nhật todo
  const updateTodo = (id, updatedTask) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, task: updatedTask } : todo
    ));
    setEditingTodo(null); // Tắt chế độ chỉnh sửa sau khi cập nhật
  };


  return (
    <div className="container mx-auto p-4 max-w-md">
      <h1 className="text-2xl font-bold text-center mb-6">Todo List</h1>

      {/* Form thêm/sửa Todo */}
      <TodoForm
        addTodo={addTodo}
        updateTodo={updateTodo}
        editingTodo={editingTodo}
        setEditingTodo={setEditingTodo}
      />

      {/* Danh sách Todos */}
      {todos.length === 0 ? (
        <p className="text-center text-gray-500">Chưa có công việc nào.</p>
      ) : (
        <ul className="bg-white shadow rounded-md overflow-hidden">
          {todos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onDelete={deleteTodo}
              onToggleComplete={toggleComplete}
              onEdit={handleEdit}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;