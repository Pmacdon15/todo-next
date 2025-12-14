'use server'
import { neon } from '@neondatabase/serverless'
import { isSession } from './auth'

export async function toggleComplete(id: number, userEmail: string) {
	await isSession(userEmail)
	try {
		const sql = neon(`${process.env.DATABASE_URL}`)
		await sql`
            Update NTODOS
            set complete = Not complete 
            Where id=${id}
        `
	} catch (e) {
		console.error('Error toggling complete: ', e)
	}
}

export async function addTodo(
	userEmail: string,
	dueDate: Date,
	formData: FormData,
) {
	await isSession(userEmail)
	const todoName = formData.get('todo-name')?.toString() || ''
	const todoDescription = formData.get('todo-description')?.toString() || ''

	try {
		const sql = neon(`${process.env.DATABASE_URL}`)

		// Convert dueDate to ISO string with timezone offset
		const dueDateWithTimezone = dueDate.toISOString()

		await sql`
            INSERT INTO NTODOS (todoName, todoDescription, dueDate, complete, userEmail)
            VALUES (${todoName}, ${todoDescription}, ${dueDateWithTimezone},  ${false}, ${userEmail});
        `
	} catch (e) {
		console.error('Error adding todo: ', e)
	}
}

export async function deleteTodo(id: number, userEmail: string) {
	await isSession(userEmail)
	try {
		const sql = neon(`${process.env.DATABASE_URL}`)
		await sql`
            delete from NTODOS
            where id = ${id};
        `
	} catch (e) {
		console.error('Error deleting todo: ', e)
	}
}
