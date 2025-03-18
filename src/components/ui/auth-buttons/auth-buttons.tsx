'use client';
import { loginGithub, loginGitlab, loginDiscord, logout } from '@/actions/auth'
import { Button } from '@/components/ui/button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faGitlab, faDiscord } from '@fortawesome/free-brands-svg-icons';
import { Session } from '@auth/core/types';

interface Props {
    session: Session | null;
}

export default function AuthButtons({ session }: Props) {
    return (
        <>
            <div className='flex p-4 gap-4'>
                {!session ? (
                    <>
                        <Button onClick={() => loginGithub()}>
                            <FontAwesomeIcon icon={faGithub} className="mr-2" />
                            Sign In With GitHub
                        </Button>
                        <Button onClick={() => loginGitlab()}>
                            <FontAwesomeIcon icon={faGitlab} className="mr-2" />
                            Sign In With GitLab
                        </Button>
                        <Button onClick={() => loginDiscord()}>
                            <FontAwesomeIcon icon={faDiscord} className="mr-2" />
                            Sign In With GitLab
                        </Button>
                    </>
                ) : (
                    <Button onClick={() => logout()}>Sign Out</Button>
                )}
            </div>
        </>
    );
};