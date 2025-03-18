'use client';
import { login, logout } from '@/actions/auth'
import { Button } from '@/components/ui/button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { Session } from '@auth/core/types';

interface Props {
    session: Session | null;
}

export default function AuthButtons({ session }: Props) {
    return (
        <>
            <div className='flex p-4 gap-4'>
                {!session ? (
                    <Button onClick={() => login()}>
                        <FontAwesomeIcon icon={faGithub} className="mr-2" />
                        Sign In With GitHub
                    </Button>
                ) : (
                    <Button onClick={() => logout()}>Sign Out</Button>
                )}
            </div>
        </>
    );
};