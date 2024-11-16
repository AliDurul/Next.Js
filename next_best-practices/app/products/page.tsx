import Link from 'next/link'
import React from 'react'
import { v4 as uuid } from 'uuid'
import Search from './_components/Search'

export default async function ProductsPage({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {

    const search = await searchParams.search as string
    
    console.log(search);

    // const page = typeof searchParams.page === 'string' ? Number(searchParams.page) : 1
    // const limit = typeof searchParams.limit === 'string' ? Number(searchParams.limit) : 10

    // const search = typeof searchParams.search === 'string' ? searchParams.search : undefined

    // const promise = getMovies({ page, limit, query: search })

    return (
        <section className='py-24' key={uuid()}>
            
        </section>
    )
}
