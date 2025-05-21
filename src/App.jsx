import React, { useState, useEffect } from 'react';
import { v4 as generateId } from 'uuid';
import TodoForm from './components/TodoForm';
import TodoItem from './components/TodoItem';

function App() {
    // Khởi tạo state todos từ localStorage (nếu có) hoặc mảng rỗngff
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : []; 
  });
  // Theo dõi todo đang được chỉnh sửa
  const [editingTodo, setEditingTodo] = useState(null);
  // Lọc todo theo trạng thái
  const [filter, setFilter] = useState('all');

  // Lưu todos vào localStorage khi chúng thay đổi
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  // Thêm todo mới
  const addTodo = (task) => {
    const newTodo = {
      id: generateId(),
      task: task,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    setTodos([...todos, newTodo]);
  };

  // Xóa todo
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
    if (editingTodo && editingTodo.id === id) {
      setEditingTodo(null);
    }
  };

  // Chuyển trạng thái todo
  const toggleComplete = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  // Chỉnh sửa todo
  const handleEdit = (todoToEdit) => {
    setEditingTodo(todoToEdit);
  };

  // Cập nhật todo
  const updateTodo = (id, updatedTask) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, task: updatedTask } : todo
    ));
    setEditingTodo(null);
  };

  // Lọc todo theo trạng thái
  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  // Render component
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 py-12 px-4 sm:px-6 lg:px-8 flex justify-center items-start">
      <div className="max-w-md w-full bg-gray-800 bg-opacity-80 backdrop-blur-lg text-white rounded-2xl shadow-2xl p-10 space-y-8 border border-gray-700 transition-all duration-300 hover:shadow-blue-500/20">
        <h1 className="text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
          TODOLIST Bean
        </h1>
        {/* Hiển thị form thêm todo */}
        <TodoForm
          addTodo={addTodo}
          updateTodo={updateTodo}
          editingTodo={editingTodo}
          setEditingTodo={setEditingTodo}
        />
        {/* Hiển thị các nút lọc todo */}
        {todos.length > 0 && (
          <div className="flex justify-center space-x-4 text-sm">
            <button 
              onClick={() => setFilter('all')}
              className={`px-3 py-1 rounded-full transition-all duration-300 ${filter === 'all' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'}`}
            >
              Tất cả
            </button>
            <button 
              onClick={() => setFilter('active')}
              className={`px-3 py-1 rounded-full transition-all duration-300 ${filter === 'active' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'}`}
            >
              Đang làm
            </button>
            <button 
              onClick={() => setFilter('completed')}
              className={`px-3 py-1 rounded-full transition-all duration-300 ${filter === 'completed' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'}`}
            >
              Đã xong
            </button>
          </div>
        )}

        {/* Hiển thị thông báo khi không có công việc */}
        {todos.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 space-y-3 text-gray-400">
            <svg className="w-16 h-16 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
            </svg>
            <p className="text-center italic">Chưa có công việc nào. Thêm mới đi nào!</p>
          </div>
        ) : (
          <ul className="space-y-3">
            {filteredTodos.map(todo => (
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
        {/* Hiển thị số lượng công việc chưa hoàn thành */}
        {todos.length > 0 && (
          <div className="text-sm text-gray-400 text-center">
            {todos.filter(todo => !todo.completed).length} công việc chưa hoàn thành
          </div>
        )}
      </div>
    </div>
  );
}

export default App;