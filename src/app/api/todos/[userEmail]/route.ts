import { neon } from '@neondatabase/serverless'
import type { NextRequest } from 'next/server'
import { isSession } from '@/actions/auth'
import type { Todo } from '@/types/types'

export async function GET(request: NextRequest) {
	const url = new URL(request.url)
	const pathSegments = url.pathname.split('/')
	const userEmail = pathSegments[pathSegments.length - 1]
	const uriDecodedUserEmail = decodeURIComponent(userEmail)
	await isSession(uriDecodedUserEmail)

	try {
		const sql = neon(`${process.env.DATABASE_URL}`)
		const result = await sql`
			SELECT * FROM NTODOS 
			WHERE userEmail = ${uriDecodedUserEmail} 
			ORDER BY duedate
		`
		return new Response(JSON.stringify(result as Todo[]), {
			headers: { 'Content-Type': 'application/json' },
		})
	} catch (error) {
        console.error(error)
		return new Response(`Error getting comments: ${error}`, {
			headers: { 'Content-Type': 'text/plain' },
		})
	}
}