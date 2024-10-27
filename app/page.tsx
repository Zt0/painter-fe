import SideNav from '@/app/ui/dashboard/sidenav';

export default function Page() {
    return (
        <main className="flex min-h-screen">
            <div className="w-full flex-none md:w-64">
                <SideNav />
            </div>
            <div className="flex-grow p-6 md:overflow-y-auto md:p-12">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">Welcome to My Portfolio</h1>
                    <p className="text-lg text-gray-600">
                        This website showcases my work and projects. Feel free to explore!
                    </p>
                </div>
            </div>
        </main>
    );
}
