import Header from '@/components/ui/header/header'
import AuthButtons from '@/components/ui/auth-buttons/auth-buttons';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
export default async function Page() {
  const session = await auth();
  if(session)redirect(`/todo/${session.user?.email}`);

  return (
    <div className='flex flex-col items-center'>
      <Header />
      <div className="flex flex-col border items-center justify-center rounded-md w-5/6 md:w-3/6 mt-4 p-8 shadow-md gap-4">
        <p className="text-sm text-gray-600 indent-8 border rounded-sm p-8 shadow-md">
          Currently, only GitHub login is available. GitHub accounts are free - feel free to sign up to try the app!
          Built with Next.js 15, Shadcn UI, TanStack Query, Tailwind CSS, and TypeScript.
        </p>
        <AuthButtons session={session} />
      </div>
    </div>
  );
};