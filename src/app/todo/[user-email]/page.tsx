'use client'
import TodoClientComponent from '@/components/ui/todo-client/todo-client-component'

export default function Page() {
    return (
        <div className="flex flex-col min-h-full w-full justify-center items-center">
            <h1 className="text-4xl mt-4 font-bold ">Pat&apos;s Todo&apos;s</h1>
            <TodoClientComponent />
        </div>
    );
}
