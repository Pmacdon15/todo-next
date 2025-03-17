import { useQuery } from '@tanstack/react-query';
import { Todo } from '@/types/types'

const fetchTodos = async (): Promise<Array<Todo>> => {
    const response = await fetch('api/todos')
    // console.log(JSON.stringify(response))
    return await response.json();
}


export const useGetTodos = () => {
    return useQuery({
      queryKey: ['todos'],
      queryFn: () => fetchTodos(),
    })
  }
  