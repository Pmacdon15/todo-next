'use server'
import { neon } from '@neondatabase/serverless';

export async function toggleComplete(id: number) {
    const sql = neon(`${process.env.DATABASE_URL}`);
    const result = await sql(`
        Update NTODOS
        set complete = Not complete 
        Where id=${id}
        `);
    console.log(result)
}

export async function addTodo(dueDate: Date, formData: FormData) {
    const todoName = formData.get('todo-name')?.toString() || '';
    const todoDescription = formData.get('todo-description')?.toString() || '';
    // const dueDate = formData.get('due-date')?.toString() || '';
    console.log(todoName);
    console.log(todoDescription);
    console.log(dueDate);
}