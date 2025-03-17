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

export default function TodoClientComponent() {

    const { data, isPending, isError: isErrorLoading } = useGetTodos();
    const notCompleteTodos = data?.filter((todo) => { if (!todo.complete) return true; });
    const completeTodos = data?.filter((todo) => { if (todo.complete) return true })
    const [dueDate, setDueDate] = useState<Date>(new Date(Date.now() + 24 * 60 * 60 * 1000));

    const { mutate: mutateAddTodo } = useAddTodo();
    const { mutate: mutateToggleComplete } = useToggleTodo();
    const { mutate: mutateDeleteTodo } = useDeleteTodo();

    console.log(data);
    return (
        <>
            <NewTodoForm dueDate={dueDate} setDueDate={setDueDate} addTodoAction={mutateAddTodo} />
            <Todos
                sectionName="Current"
                todos={notCompleteTodos}
                isPending={isPending}
                toggleTodo={mutateToggleComplete}
                isErrorLoading={isErrorLoading}
                deleteTodo={mutateDeleteTodo}
            />
            <Todos
                sectionName="Complete"
                todos={completeTodos}
                isPending={isPending}
                toggleTodo={mutateToggleComplete}
                isErrorLoading={isErrorLoading}
                deleteTodo={mutateDeleteTodo}
            />
        </>
    );
}

interface NewTodoFormProps {
    dueDate: Date;
    setDueDate: (date: Date) => void;
    addTodoAction: ({ dueDate, formData }: { dueDate: Date; formData: FormData }) => void;
}

function NewTodoForm({ dueDate, setDueDate, addTodoAction }: NewTodoFormProps) {
    return (
        <div className="border rounded-md w-5/6 md:w-3/6 mt-4 p-8 shadow-md">
            <h1 className="text-2xl mx-auto">Add a Todo</h1>
            <form
                action={(formData: FormData) => {
                    addTodoAction({ dueDate, formData });
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
    todos: Todo[] | undefined;
    isPending: boolean;
    isErrorLoading?: boolean;
    toggleTodo: (id: number) => void;
    deleteTodo: (id: number) => void;
}

function Todos({ sectionName, todos, isPending, isErrorLoading, toggleTodo, deleteTodo }: TodosProps) {
    if (isPending) return <div className="border rounded-md w-5/6 md:w-3/6 mt-4 p-8 shadow-md"><h1>Loading.....</h1></div>
    if (isErrorLoading) return <div className="border rounded-md w-5/6 md:w-3/6 mt-4 p-8 shadow-md"><h1>Error Loading</h1></div>
    return (
        <div className="border rounded-md w-5/6 md:w-3/6 mt-4 p-8 shadow-md">
            <h1 className="text-2xl mx-auto">{sectionName} Todos</h1>
            <ul className="ml-4">
                {todos?.map((todo) => (
                    <li
                        className='flex flex-col md:flex-row gap-2 items-center border-b pb-2 mb-2'
                        key={todo.id}>
                       <div className='flex items-center'>
                        <Checkbox
                            defaultChecked={todo.complete}
                            onClick={() => toggleTodo(todo.id)}
                        />
                        <p className={`text-xl w-full ${todo.complete ? 'line-through' : ''}`}>
                            {todo.todoname} - {todo.tododescription}
                        </p>
                        </div>
                        <span className={`text-sm flex justify-end ${todo.duedate && new Date(todo.duedate).getTime() < new Date().setHours(0, 0, 0, 0) ? 'text-red-600' : ''}`}>Due: {new Date(todo.duedate).toString()}</span>
                        <div className="flex justify-end">
                            <Button onClick={() => deleteTodo(todo.id)}>Delete</Button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

