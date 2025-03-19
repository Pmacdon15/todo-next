import { neon } from '@neondatabase/serverless';
import { Todo } from '@/types/types';
import { isSession } from '@/actions/auth';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
    const url = new URL(request.url);
    const pathSegments = url.pathname.split('/');
    const userEmail = pathSegments[pathSegments.length - 1];
    const uriDecodedUserEmail = decodeURIComponent(userEmail);
    await isSession(uriDecodedUserEmail);

    try {
        const sql = neon(`${process.env.DATABASE_URL}`);
        const result = await sql(`SELECT * FROM NTODOS WHERE userEmail = '${uriDecodedUserEmail}' ORDER BY duedate  `);
        return new Response(JSON.stringify(result as Todo[]), { headers: { 'Content-Type': 'application/json' } });
    } catch (error) {
        return new Response(`Error getting comments: ${error}`, { headers: { 'Content-Type': 'text/plain' } });
    }
}

