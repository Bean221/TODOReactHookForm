import React from 'react';

const TodoItem = ({ todo, onDelete, onToggleComplete, onEdit }) => {
  return (
    <li className={`group relative flex items-center justify-between p-4 rounded-xl transition-all duration-300 ease-in-out
      ${todo.completed 
        ? 'bg-gray-700/50 border border-gray-600/50' 
        : 'bg-gray-800/60 border border-gray-700/50 hover:bg-gray-700/70 hover:border-gray-600/70'}`}
    >
      <div className="flex items-center flex-grow mr-2">
        <button
          onClick={() => onToggleComplete(todo.id)}
          className={`flex-shrink-0 w-6 h-6 rounded-full border-2 mr-3 flex items-center justify-center transition-all duration-300
            ${todo.completed 
              ? 'bg-green-500/80 border-green-400 text-white' 
              : 'border-gray-500 hover:border-blue-400 group-hover:border-blue-400'}`}
          aria-label={todo.completed ? "Mark as incomplete" : "Mark as complete"}
        >
          {todo.completed && (
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
            </svg>
          )}
        </button>
        <span className={`flex-grow mr-4 text-lg font-medium transition-all duration-300
          ${todo.completed ? 'line-through text-gray-400 italic' : 'text-gray-100'}`}>
          {todo.task}
        </span>
      </div>
      
      <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button
          onClick={() => onEdit(todo)}
          className="p-2 rounded-lg text-blue-400 hover:bg-blue-500/20 transition-all duration-300"
          aria-label="Edit"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
          </svg>
        </button>
        <button
          onClick={() => onDelete(todo.id)}
          className="p-2 rounded-lg text-red-400 hover:bg-red-500/20 transition-all duration-300"
          aria-label="Delete"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
          </svg>
        </button>
      </div>
    </li>
  );
};

export default TodoItem;
