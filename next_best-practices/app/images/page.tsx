import Image from 'next/image'
import React from 'react'
import image1 from '@/public/images/2399990.jpg'
import getBase64 from '@/actions/getBase64'
import Divider from '@/components/Divider'

export default async function ImagesPage() {
    const imgUrl = 'https://images.unsplash.com/photo-1504893524553-b855bce32c67?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fG5hdHVyZXxlbnwwfHwwfHx8MA%3D%3D'

    const blurData = await getBase64(imgUrl)

    return (
        <div className='flex min-h-screen w-full flex-col gap-5 justify-center items-center '>
            <Divider title='Importing pic from folder with lazy loading' />
            <div>
                <Image
                    src={image1}
                    alt='image1'
                    placeholder='blur'
                />
            </div>
            <Divider title='Dislpaying pic from url with lazy loading' />
            <div>
                <Image
                    className='mt-3'
                    src={imgUrl}
                    width={600}
                    height={300}
                    alt='image1'
                    placeholder='blur'
                    blurDataURL={blurData}
                />
            </div>




        </div>
    )
}
