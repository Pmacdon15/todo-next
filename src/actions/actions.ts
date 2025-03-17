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