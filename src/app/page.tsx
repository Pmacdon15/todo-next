'use client'
import { useGetTodos } from '@/hooks/hooks'
import { Todo } from '@/types/types'
import { useToggleTodo } from '@/hooks/mutations/mutations';
import { DatePicker } from '@/components/ui/data-picker/date-picker';
import { Button } from "@/components/ui/button"
import { addTodo } from '@/actions/actions';
import { useState } from 'react';

export default function Home() {

  const { data, isPending } = useGetTodos();
  const notCompleteTodos = data?.filter((todo) => { if (!todo.complete) return true; });
  const completeTodos = data?.filter((todo) => { if (todo.complete) return true })
  const [dueDate, setDueDate] = useState<Date | undefined>(undefined);

  const addDateToAction = addTodo.bind(null, dueDate || new Date())

  const { mutate: mutateToggleComplete } = useToggleTodo();

  return (
    <div className="flex flex-col min-h-full w-full justify-center items-center">
      <h1 className="text-4xl mt-4 font-bold ">Todo&apos;s</h1>
      <NewTodoForm setDueDate={setDueDate} addDateToAction={addDateToAction} />
      <Todos todos={notCompleteTodos} isPending={isPending} toggleTodo={mutateToggleComplete} />
      <Todos todos={completeTodos} isPending={isPending} toggleTodo={mutateToggleComplete} />
    </div>
  );
}

function NewTodoForm({ setDueDate, addDateToAction }: { setDueDate: (date: Date | undefined) => void, addDateToAction: any }) {
  return (
    <div className="border rounded-md w-3/6 mt-4 p-8 shadow-md">
      <h1 className="text-2xl mx-auto">Add a Todo</h1>
      <form
        action={addDateToAction}        >
        <div className='flex p-4 gap-4'>
          <input name="todo-name" className='w-2/6 h-10 border shadow-md rounded-md p-2 ' placeholder="Name of todo" />
          <textarea name="todo-description" className='w-3/6 border shadow-md rounded-md p-2 ' placeholder='Description' />
          <DatePicker callback={setDueDate} />
        </div>
        <div className="flex justify-end">
          <Button>Add Todo</Button>
        </div>
      </form>
    </div>
  )
}

function Todos({ todos, isPending, toggleTodo }: { todos: Todo[] | undefined, isPending: boolean, toggleTodo: (id: number) => void }) {
  if (isPending) return <div className="border rounded-md w-3/6 mt-4 p-8"><h1>Loading.....</h1></div>
  return (
    <div className="border rounded-md w-3/6 mt-4 p-8 shadow-md">
      <h1 className="text-2xl mx-auto">Current Todos</h1>
      <ul className="ml-4">
        {todos?.map((todo) => (
          <li
            className='flex gap-2'
            key={todo.id}>
            <input
              defaultChecked={todo.complete}
              type="checkbox"
              onClick={() => toggleTodo(todo.id)}
            />
            <p className={todo.complete ? 'line-through' : ''}>
              {todo.todoname} - {todo.tododescription}
            </p>
          </li>
        ))}
      </ul>
    </div>
  )
}

