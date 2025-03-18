import TodoClientComponent from '@/components/ui/todo-client/todo-client-component'
import Header from '@/components/ui/header/header'
import AuthButtons from '@/components/ui/auth-buttons/auth-buttons';
import { auth } from '@/auth';

export default async function Page({
  params,
}: {
  params: Promise<{ userEmail: string }>
}) {
  const session = await auth();
  const { userEmail } = await params;
  const uriDecodedUserEmail = decodeURIComponent(userEmail);
  if (userEmail) console.log(uriDecodedUserEmail);

  return (
    <div className="flex flex-col min-h-full w-full justify-center items-center ">
      <div className='flex w-full justify-between'>
        <div className='flex justify-center'></div>
        <Header  />
        <AuthButtons session={session} />
      </div>
      <TodoClientComponent />
    </div>
  );
}