// src/components/TodoForm.jsx
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { todoSchema } from '../schema/todoSchema'; // Import schema

const TodoForm = ({ addTodo, updateTodo, editingTodo, setEditingTodo }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(todoSchema),
    // Đặt defaultValues khi editingTodo thay đổi để điền dữ liệu vào form
    defaultValues: editingTodo ? { task: editingTodo.task } : { task: '' },
  });

  // Dùng useEffect để reset form khi editingTodo thay đổi
  useEffect(() => {
    if (editingTodo) {
      reset({ task: editingTodo.task });
    } else {
      reset({ task: '' });
    }
  }, [editingTodo, reset]); // reset cũng là một dependency cần thêm vào useEffect

  const onSubmit = (data) => {
    if (editingTodo) {
      // Nếu đang chỉnh sửa, gọi hàm updateTodo
      updateTodo(editingTodo.id, data.task);
      setEditingTodo(null); // Kết thúc chế độ chỉnh sửa
    } else {
      // Nếu không, gọi hàm addTodo để thêm mới
      addTodo(data.task);
    }
    reset({ task: '' }); // Reset form sau khi submit thành công (cho cả thêm và sửa)
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mb-6 flex flex-col md:flex-row gap-2">
      <div className="flex-grow">
        <input
          type="text"
          placeholder="Thêm công việc mới..."
          {...register('task')}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring ${errors.task ? 'border-red-500' : 'border-gray-300'}`}
        />
        {errors.task && <p className="text-red-500 text-sm mt-1">{errors.task.message}</p>}
      </div>
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        {editingTodo ? 'Cập nhật' : 'Thêm'}
      </button>
    </form>
  );
};

export default TodoForm;