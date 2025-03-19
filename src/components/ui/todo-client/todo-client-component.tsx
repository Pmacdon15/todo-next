'use client'
import { useGetTodos } from '@/hooks/hooks'
import { Todo } from '@/types/types'
import { useToggleTodo, useAddTodo, useDeleteTodo } from '@/hooks/mutations/mutations';
import { DatePicker } from '@/components/ui/data-picker/date-picker';
import { Button } from "@/components/ui/button"
import { useState } from 'react';
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function TodoClientComponent({ userEmail }: { userEmail: string }) {

    const { data, isPending, isError: isErrorLoading } = useGetTodos(userEmail);
    const notCompleteTodos = data?.filter((todo) => { if (!todo.complete) return true; });
    const completeTodos = data?.filter((todo) => { if (todo.complete) return true })
    const [dueDate, setDueDate] = useState<Date>(new Date(Date.now() + 24 * 60 * 60 * 1000));

    const { mutate: mutateAddTodo } = useAddTodo(userEmail);
    const { mutate: mutateToggleComplete } = useToggleTodo(userEmail);
    const { mutate: mutateDeleteTodo } = useDeleteTodo(userEmail);
    
    return (
        <div className='flex flex-col min-h-full w-full justify-center items-center mb-8'>
            <NewTodoForm userEmail={userEmail} dueDate={dueDate} setDueDate={setDueDate} addTodoAction={mutateAddTodo} />
            <Todos
                sectionName="Current"
                userEmail={userEmail}
                todos={notCompleteTodos}
                isPending={isPending}
                toggleTodo={mutateToggleComplete}
                isErrorLoading={isErrorLoading}
                deleteTodo={mutateDeleteTodo}
            />
            <Todos
                sectionName="Complete"
                userEmail={userEmail}
                todos={completeTodos}
                isPending={isPending}
                toggleTodo={mutateToggleComplete}
                isErrorLoading={isErrorLoading}
                deleteTodo={mutateDeleteTodo}
            />
        </div>
    );
}

interface NewTodoFormProps {
    userEmail: string;
    dueDate: Date;
    setDueDate: (date: Date) => void;
    addTodoAction: ({ userEmail, dueDate, formData }: { userEmail: string, dueDate: Date; formData: FormData }) => void;
}

function NewTodoForm({ userEmail, dueDate, setDueDate, addTodoAction }: NewTodoFormProps) {
    return (
        <div className="border rounded-md w-5/6 md:w-3/6 mt-4 p-8 shadow-md">
            <h1 className="text-2xl mx-auto">Add a Todo</h1>
            <form
                action={(formData: FormData) => {
                    addTodoAction({userEmail, dueDate, formData });
                }}
            >
                <div className="flex flex-col md:flex-row p-4 gap-4">
                    <Input required name="todo-name" className="w-2/6 h-10 p-2" placeholder="Name of todo" />
                    <Textarea required name="todo-description" className="w-3/6 p-2" placeholder="Description" />
                    <DatePicker callback={setDueDate} />
                </div>
                <div className="flex justify-end">
                    <Button type="submit">Add Todo</Button>
                </div>
            </form>
        </div>
    );
}

interface TodosProps {
    sectionName: string;
    userEmail: string;
    todos: Todo[] | undefined;
    isPending: boolean;
    isErrorLoading?: boolean;
    toggleTodo: ({ id, userEmail }: { id: number, userEmail: string }) => void;
    deleteTodo: ({ id, userEmail }: { id: number, userEmail: string }) => void;
}

function Todos({ sectionName, userEmail, todos, isPending, isErrorLoading, toggleTodo, deleteTodo }: TodosProps) {
    if (isPending) return <div className="border rounded-md w-3/6 mt-4 p-8 shadow-md"><h1>Loading.....</h1></div>
    if (isErrorLoading) return <div className="border rounded-md w-3/6 mt-4 p-8 shadow-md"><h1>Error Loading</h1></div>
    return (
        <div className="border rounded-md w-5/6 md:w-3/6 mt-4 p-8 shadow-md">
            <h1 className="text-2xl mx-auto">{sectionName} Todos</h1>
            <ul className="ml-4">
                {todos?.map((todo) => (
                    <li
                        className='flex flex-col md:flex-row gap-2 items-center border-b pb-2 md:mt-4 mb-2'
                        key={todo.id}>
                        <Checkbox
                            defaultChecked={todo.complete}
                            onClick={() => toggleTodo({ id: todo.id, userEmail })}
                        />
                        {/* if complete cross out */}
                        <p className={`text-xl w-full ${todo.complete ? 'line-through' : ''}`}>
                            {todo.todoname} - {todo.tododescription}
                        </p>
                        <span
                            // if past due make red
                            className={`text-sm flex justify-end ${todo.duedate && new Date(todo.duedate).getTime() < new Date().setHours(0, 0, 0, 0) ? 'text-red-600' : ''}`}
                        >
                            Due: {
                                new Intl.DateTimeFormat(undefined, {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric',
                                }).format(new Date(todo.duedate))
                            }
                        </span>
                        <div className="flex justify-end">
                            <Button onClick={() => deleteTodo({ id: todo.id, userEmail })}>Delete</Button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

