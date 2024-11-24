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
        <main className='w-10/12 mx-auto'>
            <AddForm />
            <ul role='list' className='divide-y divide-gray-200 mt-5'>
                {todos.map((todo: any) => (
                    <li key={todo.id} className='py-4 flex justify-between'>
                        {todo.todo}
                        <DeleteForm id={todo.id} todo={todo.text} />
                    </li>
                ))}
            </ul>
        </main>
    )
}
