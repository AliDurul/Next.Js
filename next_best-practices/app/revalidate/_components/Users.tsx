import { revalidateUsers } from "@/actions/revalidate"

async function getUsers() {
    const endpoint = 'https://64ecd95ff9b2b70f2bfb0943.mockapi.io/users'
    const response = await fetch(endpoint, { next: { tags: ['users'] } })
    return response.json()
}

export default async function Users() {
    const users = await getUsers()

    return (
        <section className='mt-16'>
            <form
                action={revalidateUsers}
                className='flex items-center justify-between'
            >
                <h3 className='font-serif text-xl'>Users</h3>
                <button >Revalidate users</button>
            </form>
            <div className='mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
                {users.map((user: any) => (
                    <div key={user.id} className='rounded bg-white text-gray-500 p-4 shadow'>
                        <h3 className='font-semibold '>{user.name}</h3>
                    </div>
                ))}
            </div>
        </section>
    )
}