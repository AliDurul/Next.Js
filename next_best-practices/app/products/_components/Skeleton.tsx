export default function Skeleton() {
    return (
        <ul className='mt-6 grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 sm:gap-y-10 lg:grid-cols-4'>
            {[...Array(10)].map((movie, index) => (
                <li key={index} className='relative animate-pulse'>
                    <div className='aspect-[4/3] h-[200] w-full overflow-hidden rounded-lg bg-gray-300'></div>
                    <p className='mt-2 h-4 w-1/2 rounded-lg bg-gray-600'></p>
                    <p className='mt-2 block h-4 rounded-lg bg-gray-600 text-sm font-medium'></p>
                    <p className='mt-2 block h-4 rounded-lg bg-gray-600 text-sm font-medium'></p>
                </li>
            ))}
        </ul>
    )
}