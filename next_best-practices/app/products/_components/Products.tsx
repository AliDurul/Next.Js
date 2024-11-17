import getBase64 from '@/actions/getBase64';
import Image from 'next/image';
import React from 'react'


interface Product {
    id: number;
    title: string;
    description: string;
    category: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    tags: string[];
    sku: string;
    weight: number;
    dimensions: {
        length: number;
        width: number;
        height: number;
    };
    warrantyInformation: string;
    shippingInformation: string;
    availabilityStatus: string;
    reviews: {
        user: string;
        comment: string;
        rating: number;
    }[];
    returnPolicy: string;
    minimumOrderQuantity: number;
    // meta: {
    //     [key: string]: any;
    // };
    images: string[];
    thumbnail: string;
}


export default function Products({ products }: { products: Product[] }) {

    return (
        <ul className="mt-6 grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 sm:gap-y-10 lg:grid-cols-4">
            {
                products.map(async (product) => {
                    const blurData = await getBase64(product.images[0])
                    return (
                        <li key={product.id} className="group relative">
                            <div className="relative">
                                <Image
                                    width={300}
                                    height={300}
                                    alt={product.title}
                                    src={product.images[0]}
                                    className="aspect-[4/3] w-full rounded-lg bg-gray-100 object-cover"
                                    placeholder='blur'
                                    blurDataURL={blurData}
                                />
                                <div
                                    aria-hidden="true"
                                    className="absolute inset-0 flex items-end p-4 opacity-0 group-hover:opacity-100"
                                >
                                    <div className="w-full rounded-md bg-zinc-500 px-4 py-2 text-center text-sm font-medium text-slate-300 backdrop-blur backdrop-filter">
                                        View Product
                                    </div>
                                </div>
                            </div>
                            <div className="mt-4 flex items-center justify-between space-x-8 text-base font-medium text-slate-300">
                                <h3>
                                    <a href="#">
                                        <span aria-hidden="true" className="absolute inset-0" />
                                        {product.title}
                                    </a>
                                </h3>
                                <p>{product.price}</p>
                            </div>
                            <p className="mt-1 text-sm text-slate-500">{product.category}</p>
                        </li>
                    )
                })
            }

        </ul>


    )
}
