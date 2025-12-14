import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addTodo, deleteTodo, toggleComplete } from '@/actions/actions'

export const useToggleTodo = (userEmail: string) => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: ({ id, userEmail }: { id: number; userEmail: string }) =>
			toggleComplete(id, userEmail),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['todos', userEmail] })
		},
	})
}

export const useAddTodo = (userEmail: string) => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: ({
			userEmail,
			dueDate,
			formData,
		}: {
			userEmail: string
			dueDate: Date
			formData: FormData
		}) => {
			const bindWithUserEmail = addTodo.bind(null, userEmail)
			const bindActionWithDueDate = bindWithUserEmail.bind(null, dueDate)
			return bindActionWithDueDate(formData)
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['todos', userEmail] })
		},
	})
}

export const useDeleteTodo = (userEmail: string) => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: ({ id, userEmail }: { id: number; userEmail: string }) =>
			deleteTodo(id, userEmail),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['todos', userEmail] })
		},
	})
}
