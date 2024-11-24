import React from 'react'
import { AddForm } from './_components/add-form'
import { DeleteForm } from './_components/delete-from'

async function getTodos() {
    const endpoint = 'https://64ecd95ff9b2b70f2bfb0943.mockapi.io/todos'
    const response = await fetch(endpoint, { next: { tags: ['todos'] } })
    return response.json()
}

export default async function UseFormState() {
    const todos = await getTodos()
    return (
        <main>
            <h1 className="">Todos</h1>
            <AddForm />
            <ul className='mt-4'>
                {todos.map((todo: any) => (
                    <li key={todo.id} className='flex gap-5'>
                        {todo.todo}
                        <DeleteForm id={todo.id} todo={todo.text} />
                    </li>
                ))}
            </ul>
        </main>
    )
}
