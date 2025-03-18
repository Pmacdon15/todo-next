import TodoClientComponent from '@/components/ui/todo-client/todo-client-component'
import Header from '@/components/ui/header/header'

export default function Page() {
    return (
        <div className="flex flex-col min-h-full w-full justify-center items-center ">
            <Header />
            <TodoClientComponent />
        </div>
    );
}
