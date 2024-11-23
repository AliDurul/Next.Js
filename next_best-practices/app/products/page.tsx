/* eslint-disable @typescript-eslint/no-unused-vars */
import Link from 'next/link'
import React, { Suspense } from 'react'
import { v4 as uuid } from 'uuid'
import Search from './_components/Search'
import { getProducts } from '@/actions/productsActions'
import Products from './_components/Products'
import Trigger from './_components/Trigger'
import Skeleton from './_components/Skeleton'
import Await from './_components/Await'

type MovieParams = {
    params: Promise<{ slug: string }>,
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function ProductsPage({ params, searchParams }: MovieParams) {

    // const slug = (await params).slug
    const page = Number((await searchParams).page ?? 1)
    const limit = Number((await searchParams).limit ?? 10)
    const search = (await searchParams).search as string | undefined


    const promise = getProducts(page, limit, search) // Option 1
    // const productsInfo = await getProducts(page, limit, search)

    return (
        <section className='py-5'>
            <div className='container'>
                <div className='mb-12 flex items-center justify-between gap-x-16'>
                    <h1 className='text-3xl font-bold'>Products</h1>

                    <div className='grow'>
                        <Search search={search} />
                    </div>

                    <div className='flex space-x-6 items-center'>
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
                            className={`rounded border bg-gray-100 px-3 py-1 text-sm text-gray-800 `} /* Option 1 */
                        // className={`rounded border bg-gray-100 px-3 py-1 text-sm text-gray-800 ${(productsInfo.skip + productsInfo.limit >= productsInfo.total) && 'pointer-events-none opacity-50'}`}
                        >
                            Next
                        </Link>
                        {/*  option 2 */}
                        {/* <span className='text-sm text-gray-800'>
                            Page {page} of {Math.ceil(productsInfo.total / productsInfo.limit)}
                        </span> */}
                    </div>
                </div>

                {/* Option 1 */}
                <section>
                    <Suspense fallback={<Skeleton />}>
                        <Await promise={promise}>
                            {({ products }) => <Products products={products} />}
                        </Await>
                    </Suspense>
                </section>

                {/* Option 2 */}
                {/* <Products products={productsInfo.products} />
                {
                    productsInfo.products.length >= 10 && <Trigger limit={limit} />
                } */}

            </div>
        </section >
    )
}
