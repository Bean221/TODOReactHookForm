// src/components/TodoItem.jsx
import React from 'react';

const TodoItem = ({ todo, onDelete, onToggleComplete, onEdit }) => {
  return (
    <li className={`flex items-center justify-between p-3 border-b last:border-b-0 ${todo.completed ? 'bg-green-100' : 'bg-white'}`}>
      <span className={`flex-grow mr-4 ${todo.completed ? 'line-through text-gray-500' : ''}`}>
        {todo.task}
      </span>
      <div className="flex gap-2">
        <button
          onClick={() => onToggleComplete(todo.id)}
          className={`px-3 py-1 text-sm rounded ${todo.completed ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-green-500 hover:bg-green-600'} text-white focus:outline-none`}
        >
          {todo.completed ? 'Chưa xong' : 'Hoàn thành'}
        </button>
        <button
          onClick={() => onEdit(todo)} // Truyền toàn bộ todo item khi sửa
          className="px-3 py-1 text-sm bg-yellow-500 text-white rounded hover:bg-yellow-600 focus:outline-none"
        >
          Sửa
        </button>
        <button
          onClick={() => onDelete(todo.id)}
          className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none"
        >
          Xóa
        </button>
      </div>
    </li>
  );
};

export default TodoItem;