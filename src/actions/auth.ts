'use server'
import { signIn, signOut } from '@/auth';

export const loginGithub = async () => {
    await signIn('github', { redirectTo: '/' });  // Corrected
};

export const loginGitlab = async () => {
    await signIn('gitlab', { redirectTo: '/' });  // Corrected
};
export const logout = async () => {
    await signOut({ redirectTo: '/' });  // Corrected
};
