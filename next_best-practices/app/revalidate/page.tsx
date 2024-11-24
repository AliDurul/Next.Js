import React, { Suspense } from 'react'
import Users from './_components/Users'
import Todos from './_components/Todos'
import { revalidateAll } from '@/actions/revalidate'

export default function RevalidatePage() {
    return (
        <section className='py-24'>
            <div className='container'>
                <div>
                    <h1 className='text-3xl font-bold'>On-demand Revalidation</h1>
                    <h2 className='flex gap-2 font-light text-gray-700'>
                        <pre>
                            <code>revalidatePath</code>
                        </pre>{' '}
                        vs{' '}
                        <pre>
                            <code>revalidateTag</code>
                        </pre>
                    </h2>

                    <form action={revalidateAll}>
                        <button className='mt-3'>
                            Revalidate the entire path
                        </button>
                    </form>

                    <Suspense fallback={<h2>LOADING...</h2>}>
                        <Users />
                    </Suspense>
                    <Suspense fallback={<h2>LOADING...</h2>}>
                        <Todos />
                    </Suspense>

                </div>
            </div>
        </section>
    )
}
