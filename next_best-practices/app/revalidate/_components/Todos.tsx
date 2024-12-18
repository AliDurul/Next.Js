import { revalidateTodos } from "@/actions/revalidate"

async function getTodos() {
  const endpoint = 'https://64ecd95ff9b2b70f2bfb0943.mockapi.io/todos'
  const response = await fetch(endpoint, { next: { tags: ['todos'] } })
  return response.json()
}

export default async function Todos() {
  const todos = await getTodos()

  return (
    <section className='mt-16'>
      <form
        action={revalidateTodos}
        className='flex items-center justify-between'
      >
        <h3 className='font-serif text-xl'>Todos</h3>
        <button >Revalidate todos</button>
      </form>
      <div className='mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
        {todos.map((todo: any) => (
          <div key={todo.id} className='rounded bg-white p-4 shadow'>
            <h3 className='font-semibold'>{todo.title}</h3>
            <p className='text-sm text-gray-500'>
              {todo.completed ? 'Completed' : 'Pending'}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}