'use client'
import type { Session } from '@auth/core/types'
import {
	faDiscord,
	faGithub,
	faGitlab,
} from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { loginDiscord, loginGithub, loginGitlab, logout } from '@/actions/auth'
import { Button } from '@/components/ui/button'

interface Props {
	session: Session | null
}

export default function AuthButtons({ session }: Props) {
	return (
		<div className="flex flex-wrap gap-4 p-4">
			{!session ? (
				<div className="flex flex-col gap-4 p-4 md:flex-row">
					<Button onClick={() => loginGithub()}>
						<FontAwesomeIcon className="mr-2" icon={faGithub} />
						Sign In With GitHub
					</Button>
					<Button onClick={() => loginGitlab()}>
						<FontAwesomeIcon className="mr-2" icon={faGitlab} />
						Sign In With GitLab
					</Button>
					<Button onClick={() => loginDiscord()}>
						<FontAwesomeIcon className="mr-2" icon={faDiscord} />
						Sign In With Discord
					</Button>
				</div>
			) : (
				<Button onClick={() => logout()}>Sign Out</Button>
			)}
		</div>
	)
}
