
import React from 'react'
import { Cog6ToothIcon, } from '@heroicons/react/24/outline'
// import { CalendarIcon, ChartPieIcon, Cog6ToothIcon, DocumentDuplicateIcon, FolderIcon, HomeIcon, UsersIcon } from '@heroicons/react/24/outline'
import { classNames } from '@/lib/helperFuncs'
import { navigation } from '@/constraint/sidebar'
import Link from 'next/link'
import Image from 'next/image'
// import { headers } from 'next/headers'


/* Desktop component */
export default async function DesktopSidebar() {

    // const headersList = await headers()

    return (
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
            <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-4">
                <div className="flex h-16 shrink-0 items-center">
                    {/* <Image 
                        height={32}
                        width={32}
                        alt="Your Company"
                        src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=500"
                        className="h-8 w-auto"
                    /> */}
                </div>
                <nav className="flex flex-1 flex-col">
                    <ul role="list" className="flex flex-1 flex-col gap-y-7">
                        <li>
                            <ul role="list" className="-mx-2 space-y-1">
                                {navigation.map((item) => (
                                    <li key={item.name}>
                                        <Link
                                            href={item.href}
                                            className={classNames(
                                                item.current
                                                    ? 'bg-gray-800 text-white'
                                                    : 'text-gray-400 hover:bg-gray-800 hover:text-white',
                                                'group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold',
                                            )}
                                        >
                                            {item.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </li>

                        <li className="mt-auto">
                            <Link
                                href="#"
                                className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold text-gray-400 hover:bg-gray-800 hover:text-white"
                            >
                                <Cog6ToothIcon aria-hidden="true" className="size-6 shrink-0" />
                                Settings
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    )
}


