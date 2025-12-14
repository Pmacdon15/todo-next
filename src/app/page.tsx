import { redirect } from 'next/navigation'
import { auth } from '@/auth'
import AuthButtons from '@/components/ui/auth-buttons/auth-buttons'
import Header from '@/components/ui/header/header'
export default async function Page() {
	const session = await auth()
	if (session) redirect(`/todo/${session.user?.email}`)

	return (
		<div className="flex flex-col items-center">
			<Header />
			<div className="mt-4 flex w-5/6 flex-col items-center justify-center gap-4 rounded-md border p-8 shadow-md md:w-3/6">
				<p className="rounded-sm border p-8 indent-8 text-gray-600 text-sm shadow-md">
					Currently, only GitHub, GitLab login is available.
					GitHub/GitLab/Discord accounts are free - feel free to sign
					up to try the app! Built with Next.js 15, Shadcn UI,
					TanStack Query, Tailwind CSS, and TypeScript.
				</p>
				<AuthButtons session={session} />
			</div>
		</div>
	)
}
