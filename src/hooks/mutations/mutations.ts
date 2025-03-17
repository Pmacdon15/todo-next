import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { toggleComplete, addTodo, deleteTodo } from '@/actions/actions'

export const useToggleTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => toggleComplete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
    }
  })
}

export const useAddTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ dueDate, formData }: { dueDate: Date; formData: FormData }) => {
      const bindActionWithDueDate = addTodo.bind(null, dueDate);
      return bindActionWithDueDate(formData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });
};

export const useDeleteTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteTodo(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
    }
  })
}
