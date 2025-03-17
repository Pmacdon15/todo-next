import { neon } from '@neondatabase/serverless';
import { Todo } from '@/types/types';

export async function GET() {
    try {
        const sql = neon(`${process.env.DATABASE_URL}`);
        const result = await sql('SELECT * FROM NTODOs');
        return new Response(JSON.stringify(result as Todo[]), { headers: { 'Content-Type': 'application/json' } });
    } catch (error) {
        return new Response(`Error getting comments: ${error}`, { headers: { 'Content-Type': 'text/plain' } });
    }
}

