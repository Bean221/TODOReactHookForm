import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { todoSchema } from '../schema/todoSchema';

// Sử dụng react-hook-form để quản lý form và validate
const TodoForm = ({ addTodo, updateTodo, editingTodo, setEditingTodo }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(todoSchema),
    defaultValues: editingTodo ? { task: editingTodo.task } : { task: '' },
  });

  // Sử dụng useEffect để đặt lại giá trị của form khi editingTodo thay đổi
  useEffect(() => {
    if (editingTodo) {
      reset({ task: editingTodo.task });
    } else {
      reset({ task: '' });
    }
  }, [editingTodo, reset]);

  // Xử lý submit form  
  const onSubmit = (data) => {
    if (editingTodo) {
      updateTodo(editingTodo.id, data.task);
      setEditingTodo(null);
    } else {
      addTodo(data.task);
    }
    reset({ task: '' });
  };

  // Render component 
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 md:flex md:items-center md:space-y-0 md:space-x-4">
      <div className="flex-grow">
        <input
          type="text"
          placeholder={editingTodo ? "Cập nhật công việc..." : "Thêm công việc mới..."}
          {...register('task')}
          className={`w-full px-5 py-4 md:py-3 border bg-gray-700/50 text-gray-200 placeholder-gray-300 
            rounded-xl focus:outline-none focus:ring-2 shadow-sm transition-all duration-300 ease-in-out
            ${errors.task 
              ? 'border-red-500 focus:ring-red-500' 
              : 'border-gray-600/50 focus:border-blue-500/70 focus:ring-blue-500/70'}`}
        />
        {errors.task && (
          <p className="text-red-400 text-sm mt-2 ml-1">{errors.task.message}</p>
        )}
      </div>
      <button
        type="submit"
        className={`w-full md:w-auto px-8 py-4 md:py-3 rounded-xl text-white font-semibold 
          shadow-lg transition-all duration-300 ease-in-out 
          focus:outline-none focus:ring-2 focus:ring-opacity-50 transform hover:-translate-y-1
          ${editingTodo
            ? 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 focus:ring-green-500'
            : 'bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 focus:ring-blue-500'
          }`}
      >
        {editingTodo ? 'Cập nhật' : 'Thêm'}
      </button>
    </form>
  );
};

export default TodoForm;