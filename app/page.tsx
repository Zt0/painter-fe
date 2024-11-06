import Navbar from "@/app/components/nav-bar";

export default function Page() {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow p-6 md:overflow-y-auto md:p-12">
                <div className="text-center">
                    <h1 className="font-sans text-4xl mb-4">Welcome to Nkarich</h1>
                    <p className="text-lg text-gray-600">
                        This website showcases my work and projects. Feel free to explore!
                    </p>
                </div>
            </main>
        </div>
    );
}
