import TodoClientComponent from '@/components/ui/todo-client/todo-client-component'
import Header from '@/components/ui/header/header'

export default async function Page({
    params,
  }: {
    params: Promise<{ userEmail: string }>
  }) {
    const { userEmail } = await params;
    const uriDecodedUserEmail = decodeURIComponent(userEmail);
    if (userEmail) console.log(uriDecodedUserEmail);

    return (
        <div className="flex flex-col min-h-full w-full justify-center items-center ">
            <Header />
            <TodoClientComponent />
        </div>
    );
}
