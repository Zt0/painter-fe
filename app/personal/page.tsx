import SideNav from '@/app/ui/dashboard/sidenav';
import Image from 'next/image';

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">

            <div className="flex-grow p-6 md:overflow-y-auto md:p-12">
                <div className="mb-8">
                    {/* Profile Section */}
                    <div className="flex items-center space-x-4">
                        {/* Replace the src attribute with the actual path to your photo */}
                        <Image
                            src="https://avatars.dicebear.com/api/human/johndoe.svg"
                            alt="Your Name"
                            width={100}
                            height={100}
                            className="rounded-full"
                        />
                        <div>
                            <h1 className="text-2xl font-bold">Azat Antonyan</h1>
                            <p className="text-gray-600">A brief description about yourself goes here. Mention your role, interests, or a short personal bio.</p>
                        </div>
                    </div>
                </div>

                {children}
            </div>
        </div>
    );
}
