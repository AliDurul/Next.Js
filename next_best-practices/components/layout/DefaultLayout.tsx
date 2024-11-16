
import DesktopSidebar from './DesktopSidebar'
import MobileSidebar from './MobileSidebar'
// import Navbar from './Navbar'

export default function DefaultLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <>
            {/* Mobile sidebar */}
            <MobileSidebar />

            {/* Static sidebar for desktop */}
            <DesktopSidebar />

            <div className="lg:pl-72">
                {/* Sticky Navbar */}
                {/* <Navbar /> */}

                {/* Main Content */}
                <main className="py-10">
                    <div className="px-4 sm:px-6 lg:px-8">
                        {children}
                    </div>
                </main>
            </div>
        </>
    )
}