// import { PlusIcon } from '@heroicons/react/20/solid'

export default function Divider({ title = 'Another Example' }: { title?: string }) {
    return (
        <div className="relative">
            <div aria-hidden="true" className="absolute inset-0  flex items-center">
                <div className="w-full border-t border-sky-300" />
            </div>
            <div className="relative flex justify-center">
                <button
                    type="button"
                    className="inline-flex items-center gap-x-1.5 rounded-full bg-white px-3 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                    {/* <PlusIcon aria-hidden="true" className="-ml-1 -mr-0.5 size-5 text-gray-400" /> */}
                    {title}
                </button>
            </div>
        </div>
    )
}
