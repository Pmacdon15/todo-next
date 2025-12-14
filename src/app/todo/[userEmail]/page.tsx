import { checkIsAuthorized } from '@/actions/auth'
import { auth } from '@/auth'
import AuthButtons from '@/components/ui/auth-buttons/auth-buttons'
import Header from '@/components/ui/header/header'
import TodoClientComponent from '@/components/ui/todo-client/todo-client-component'

export default async function Page({
	params,
}: {
	params: Promise<{ userEmail: string }>
}) {
	const session = await auth()
	const { userEmail } = await params
	const uriDecodedUserEmail = decodeURIComponent(userEmail)

	await checkIsAuthorized(session?.user?.email, uriDecodedUserEmail)

	return (
		<div className="flex min-h-full w-full flex-col items-center justify-center">
			<div className="relative flex w-full justify-center">
				<Header />
				<div className="absolute right-0">
					<AuthButtons session={session} />
				</div>
			</div>
			<TodoClientComponent userEmail={uriDecodedUserEmail} />
		</div>
	)
}
