import * as yup from 'yup';

export const todoSchema = yup.object({
  task: yup.string()
    .required('Tên công việc không được để trống')
    .min(3, 'Tên công việc phải có ít nhất 3 ký tự'),
}).required();