'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { DatePicker } from '@/components/ui/data-picker/date-picker'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useGetTodos } from '@/hooks/hooks'
import {
	useAddTodo,
	useDeleteTodo,
	useToggleTodo,
} from '@/hooks/mutations/mutations'
import type { Todo } from '@/types/types'

export default function TodoClientComponent({
	userEmail,
}: {
	userEmail: string
}) {
	const { data, isPending, isError: isErrorLoading } = useGetTodos(userEmail)
	const notCompleteTodos = data?.filter((todo) => !todo.complete)
	const completeTodos = data?.filter((todo) => todo.complete)
	const [dueDate, setDueDate] = useState<Date>(
		new Date(Date.now() + 24 * 60 * 60 * 1000),
	)

	const { mutate: mutateAddTodo } = useAddTodo(userEmail)
	const { mutate: mutateToggleComplete } = useToggleTodo(userEmail)
	const { mutate: mutateDeleteTodo } = useDeleteTodo(userEmail)

	return (
		<div className="mb-8 flex min-h-full w-full flex-col items-center justify-center">
			<NewTodoForm
				addTodoAction={mutateAddTodo}
				dueDate={dueDate}
				setDueDate={setDueDate}
				userEmail={userEmail}
			/>
			<Todos
				deleteTodo={mutateDeleteTodo}
				isErrorLoading={isErrorLoading}
				isPending={isPending}
				sectionName="Current"
				todos={notCompleteTodos}
				toggleTodo={mutateToggleComplete}
				userEmail={userEmail}
			/>
			<Todos
				deleteTodo={mutateDeleteTodo}
				isErrorLoading={isErrorLoading}
				isPending={isPending}
				sectionName="Complete"
				todos={completeTodos}
				toggleTodo={mutateToggleComplete}
				userEmail={userEmail}
			/>
		</div>
	)
}

interface NewTodoFormProps {
	userEmail: string
	dueDate: Date
	setDueDate: (date: Date) => void
	addTodoAction: ({
		userEmail,
		dueDate,
		formData,
	}: {
		userEmail: string
		dueDate: Date
		formData: FormData
	}) => void
}

function NewTodoForm({
	userEmail,
	dueDate,
	setDueDate,
	addTodoAction,
}: NewTodoFormProps) {
	return (
		<div className="mt-4 w-5/6 rounded-md border p-8 shadow-md md:w-3/6">
			<h1 className="mx-auto text-2xl">Add a Todo</h1>
			<form
				action={(formData: FormData) => {
					addTodoAction({ userEmail, dueDate, formData })
				}}
			>
				<div className="flex flex-col gap-4 p-4 md:flex-row">
					<Input
						className="h-10 w-2/6 p-2"
						name="todo-name"
						placeholder="Name of todo"
						required
					/>
					<Textarea
						className="w-3/6 p-2"
						name="todo-description"
						placeholder="Description"
						required
					/>
					<DatePicker callback={setDueDate} />
				</div>
				<div className="flex justify-end">
					<Button type="submit">Add Todo</Button>
				</div>
			</form>
		</div>
	)
}

interface TodosProps {
	sectionName: string
	userEmail: string
	todos: Todo[] | undefined
	isPending: boolean
	isErrorLoading?: boolean
	toggleTodo: ({ id, userEmail }: { id: number; userEmail: string }) => void
	deleteTodo: ({ id, userEmail }: { id: number; userEmail: string }) => void
}

function Todos({
	sectionName,
	userEmail,
	todos,
	isPending,
	isErrorLoading,
	toggleTodo,
	deleteTodo,
}: TodosProps) {
	if (isPending)
		return (
			<div className="mt-4 w-3/6 rounded-md border p-8 shadow-md">
				<h1>Loading.....</h1>
			</div>
		)
	if (isErrorLoading)
		return (
			<div className="mt-4 w-3/6 rounded-md border p-8 shadow-md">
				<h1>Error Loading</h1>
			</div>
		)
	return (
		<div className="mt-4 w-5/6 rounded-md border p-8 shadow-md md:w-3/6">
			<h1 className="mx-auto text-2xl">{sectionName} Todos</h1>
			<ul className="ml-4">
				{todos?.map((todo) => (
					<li
						className="mb-2 flex flex-col items-center gap-2 border-b pb-2 md:mt-4 md:flex-row"
						key={todo.id}
					>
						<Checkbox
							defaultChecked={todo.complete}
							onClick={() =>
								toggleTodo({ id: todo.id, userEmail })
							}
						/>
						{/* if complete cross out */}
						<p
							className={`w-full text-xl ${todo.complete ? 'line-through' : ''}`}
						>
							{todo.todoname} - {todo.tododescription}
						</p>
						<span
							// if past due make red
							className={`flex justify-end text-sm ${todo.duedate && new Date(todo.duedate).getTime() < new Date().setHours(0, 0, 0, 0) ? 'text-red-600' : ''}`}
						>
							Due:{' '}
							{new Intl.DateTimeFormat(undefined, {
								year: 'numeric',
								month: 'short',
								day: 'numeric',
							}).format(new Date(todo.duedate))}
						</span>
						<div className="flex justify-end">
							<Button
								onClick={() =>
									deleteTodo({ id: todo.id, userEmail })
								}
							>
								Delete
							</Button>
						</div>
					</li>
				))}
			</ul>
		</div>
	)
}
