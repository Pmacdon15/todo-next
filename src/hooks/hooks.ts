import { useQuery } from '@tanstack/react-query';
import { Todo } from '@/types/types'

const fetchTodos = async (userEmail: string): Promise<Array<Todo>> => {
  const response = await fetch(`/api/todos/${userEmail}`)
  // console.log(JSON.stringify(response))
  return await response.json();
}

export const useGetTodos = (userEmail: string) => {
  return useQuery({
    queryKey: ['todos', userEmail],
    queryFn: () => fetchTodos(userEmail),
  })
}
