'use client'
import { useGetTodos } from '@/hooks/hooks'
import { Todo } from '@/types/types'
import { useToggleTodo } from '@/hooks/mutations/mutations';

export default function Home() {

  const { data, isPending } = useGetTodos();
  const notCompleteTodos = data?.filter((todo) => { if (!todo.complete) return true; });
  const completeTodos = data?.filter((todo) => { if (todo.complete) return true })

  const { mutate } = useToggleTodo();

  return (
    <div className="flex flex-col min-h-full w-full justify-center items-center">
      <h1 className="text-4xl mt-4 font-bold ">Todo&apos;s</h1>
      <Todos todos={notCompleteTodos} isPending={isPending} toggleTodo={mutate} />
      <Todos todos={completeTodos} isPending={isPending} toggleTodo={mutate} />
    </div>
  );
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

