'use client'
import { useGetTodos } from '@/hooks/hooks'
import { Todo } from '@/types/types'
import { useToggleTodo } from '@/hooks/mutations/mutations';
import { DatePicker } from '@/components/ui/data-picker/date-picker';
import { Button } from "@/components/ui/button"
import { addTodo } from '@/actions/actions';
import { useState } from 'react';
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function Page() {

  const { data, isPending, isError: isErrorLoading } = useGetTodos();
  const notCompleteTodos = data?.filter((todo) => { if (!todo.complete) return true; });
  const completeTodos = data?.filter((todo) => { if (todo.complete) return true })
  const [dueDate, setDueDate] = useState<Date | undefined>(undefined);

  const addDateToAction = addTodo.bind(null, dueDate || new Date())

  const { mutate: mutateToggleComplete } = useToggleTodo();

  return (
    <div className="flex flex-col min-h-full w-full justify-center items-center">
      <h1 className="text-4xl mt-4 font-bold ">Pat&apos;s Todo&apos;s</h1>
      <NewTodoForm setDueDate={setDueDate} addDateToAction={addDateToAction} />
      <Todos sectionName="Current" todos={notCompleteTodos} isPending={isPending} toggleTodo={mutateToggleComplete} isErrorLoading={isErrorLoading} />
      <Todos sectionName="Complete" todos={completeTodos} isPending={isPending} toggleTodo={mutateToggleComplete} isErrorLoading={isErrorLoading} />
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
          <Input name="todo-name" className='w-2/6 h-10 p-2 ' placeholder="Name of todo" />
          <Textarea name="todo-description" className='w-3/6 p-2 ' placeholder='Description' />
          <DatePicker callback={setDueDate} />
        </div>
        <div className="flex justify-end">
          <Button>Add Todo</Button>
        </div>
      </form>
    </div>
  )
}

interface TodosProps {
  sectionName: string;
  todos: Todo[] | undefined;
  isPending: boolean;
  isErrorLoading?: boolean;
  toggleTodo: (id: number) => void;
}

function Todos({ sectionName, todos, isPending, isErrorLoading, toggleTodo }: TodosProps) {
  if (isPending) return <div className="border rounded-md w-3/6 mt-4 p-8"><h1>Loading.....</h1></div>
  if (isErrorLoading) return <div className="border rounded-md w-3/6 mt-4 p-8"><h1>Error Loading</h1></div>
  return (
    <div className="border rounded-md w-3/6 mt-4 p-8 shadow-md">
      <h1 className="text-2xl mx-auto">{sectionName} Todos</h1>
      <ul className="ml-4">
        {todos?.map((todo) => (
          <li
            className='flex gap-2 items-end'
            key={todo.id}>
            <Checkbox
              defaultChecked={todo.complete}
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

