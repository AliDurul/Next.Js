/* eslint-disable @typescript-eslint/no-unused-vars */
import Link from 'next/link'
import React from 'react'
import { v4 as uuid } from 'uuid'
import Search from './_components/Search'
import { getProducts } from '@/actions/productsActions'
import Products from './_components/Products'
import Trigger from './_components/Trigger'



type MovieParams = {
    params: Promise<{ slug: string }>,
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function ProductsPage({ params, searchParams }: MovieParams) {

    // const slug = (await params).slug
    const page = Number((await searchParams).page ?? 1)
    const limit = Number((await searchParams).limit ?? 10)
    const search = (await searchParams).search as string | undefined


    const productsInfo = await getProducts(page, limit, search)

    return (
        <section className='py-24' >
            <div className='container'>
                <div className='mb-12 flex items-center justify-between gap-x-16'>
                    <h1 className='text-3xl font-bold'>Products</h1>

                    <div className='grow'>
                        <Search search={search} />
                    </div>

                    <div className='flex space-x-6'>
                        <Link
                            href={{
                                pathname: '/products',
                                query: {
                                    ...(search ? { search } : {}),
                                    page: page > 1 ? page - 1 : 1
                                }
                            }}
                            className={`rounded border bg-gray-100 px-3 py-1 text-sm text-gray-800 ${page <= 1 && 'pointer-events-none opacity-50'}`}>
                            Previous
                        </Link>
                        <Link
                            href={{
                                pathname: '/products',
                                query: {
                                    ...(search ? { search } : {}),
                                    page: page + 1
                                }
                            }}
                            className='rounded border bg-gray-100 px-3 py-1 text-sm text-gray-800'
                        >
                            Next
                        </Link>
                    </div>
                </div>

                <section>
                    <Products products={productsInfo.products} />
                    <Trigger limit={limit} />
                </section>

                {/* <Suspense fallback={<Skeleton />}>
                    <Await promise={promise}>
                        {({ movies }) => <Movies movies={movies} />}
                    </Await>
                </Suspense> */}
            </div>
        </section >
    )
}
