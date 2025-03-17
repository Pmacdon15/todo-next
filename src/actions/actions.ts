'use server'
import { neon } from '@neondatabase/serverless';

export async function toggleComplete(id: number) {
    try {
        const sql = neon(`${process.env.DATABASE_URL}`);
        await sql(`
            Update NTODOS
            set complete = Not complete 
            Where id=${id}
        `);
    } catch (e) {
        console.error("Error toggling complete: ", e)
    }
}


// export async function addTodo(dueDate: Date, formData: FormData) {
//     const todoName = formData.get('todo-name')?.toString() || '';
//     const todoDescription = formData.get('todo-description')?.toString() || '';

//     try {
//         const sql = neon(`${process.env.DATABASE_URL}`);
//         await sql(`
//             INSERT INTO NTODOS (todoName, todoDescription, dueDate, complete)
//             VALUES ($1, $2, $3, $4);
//           `, [todoName, todoDescription, dueDate, false]);
//     } catch (e) {
//         console.error("Error adding todo: ", e);
//     }
// }

export async function addTodo(dueDate: Date, formData: FormData) {
    const todoName = formData.get('todo-name')?.toString() || '';
    const todoDescription = formData.get('todo-description')?.toString() || '';

    try {
        const sql = neon(`${process.env.DATABASE_URL}`);

        // Convert dueDate to ISO string with timezone offset
        const dueDateWithTimezone = dueDate.toISOString();

        await sql(`
            INSERT INTO NTODOS (todoName, todoDescription, dueDate, complete)
            VALUES ($1, $2, $3, $4);
          `, [todoName, todoDescription, dueDateWithTimezone, false]);
    } catch (e) {
        console.error("Error adding todo: ", e);
    }
}

export async function deleteTodo(id: number) {
    try {
        const sql = neon(`${process.env.DATABASE_URL}`);
        await sql(`
            delete from NTODOS
            where id = $1;
        `, [id]);
    }catch(e){
        console.error("Error deleting todo: ", e);
    }
}